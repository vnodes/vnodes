export type IpInfo = {
    ip: string;
    hostname: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    postal: string;
    timezone: string;
    readme: string;
};

export async function ipinfo(ipAddress: string): Promise<IpInfo | null> {
    const token = process.env.IPINFO_TOKEN;

    if (!token) {
        throw new Error('IPINFO_TOKEN is required');
    }

    try {
        const response = await fetch(`https://api.ipinfo.io/lite/${ipAddress}?token=${token}/json`);
        return (await response.json()) as IpInfo;
    } catch {
        return null;
    }
}
