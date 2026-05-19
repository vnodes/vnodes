import { generate, generateSecret, generateURI, verify } from 'otplib';
import { toDataURL } from 'qrcode';

export type OtpOptions = {
    /**
     * Auth service name
     */
    issuer: string;

    logo?: string;

    /**
     * Purpose
     */
    label: string;

    /**
     * Seconds
     */
    period: number;

    /**
     * Seconds tolerance
     */
    tolerance: number | [number, number];
};
export class OtpService {
    constructor(protected readonly options: OtpOptions) {}
    /**
     * Generate secret
     * @returns
     */
    async secret() {
        return generateSecret();
    }

    /**
     * Generate otp
     * @param secret
     * @returns
     */
    async otp(secret: string) {
        return await generate({ secret, strategy: 'totp', period: this.options.period });
    }

    /**
     * Verify token
     * @param secret
     * @param token
     * @returns
     */
    async verify(secret: string, token: string) {
        const result = await verify({
            secret,
            token,
            period: this.options.period,
            epochTolerance: [1, 2],
        });
        return result.valid;
    }

    /**
     * Create URI
     * @param issuer
     * @param label
     * @param secret
     * @returns
     */
    async uri(secret: string) {
        const uriParts: string[] = [];

        const baseUri = await generateURI({
            issuer: this.options.issuer,
            label: this.options.label,
            secret,
        });
        uriParts.push(baseUri);

        if (this.options.logo) {
            const imageUrl = encodeURIComponent(this.options.logo);
            uriParts.push(`image=${imageUrl}`);
        }

        return uriParts.join('&');
    }

    async toDataURL(uri: string) {
        return await toDataURL(uri);
    }
}
