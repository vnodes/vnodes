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

export async function ipinfo(ipAddress: string): Promise<IpInfo> {
    const token = process.env.IPINFO_TOKEN;

    if (!token) {
        throw new Error('IPINFO_TOKEN is required');
    }

    const response = await fetch(`https://api.ipinfo.io/lite/${ipAddress}?token=${token}/json`);

    if (!response.ok) {
        throw new Error(`Failed to fetch IP info: ${response.statusText}`);
    }

    return (await response.json()) as IpInfo;
}
