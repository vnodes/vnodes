import { toDataURL } from 'qrcode';
import { OtpService } from './otp.js';

describe('OtpService', () => {
    const instance = new OtpService({ issuer: 'Vnodes', label: 'otp', period: 30, tolerance: [5, 0] });

    it('should genrate otp', async () => {
        const secret = await instance.secret();
        const otp = await instance.otp(secret);
        expect(otp.length).toEqual(6);
        const verifiedOtp = await instance.verify(secret, otp);
        expect(verifiedOtp).toBeTruthy();
        const uri = await instance.uri(secret);
        const qr = await toDataURL(uri);
        expect(qr).toBeDefined();
    });
    it('should work', () => {
        expect(1).toEqual(1);
    });
});
