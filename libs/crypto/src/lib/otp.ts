import { randomInt } from 'node:crypto';

/**
 * Generates a cryptographically secure numeric OTP.
 * @param length The number of digits (default is 6)
 * @returns A string representation of the OTP
 */
export const otp = (length: number = 6): string => {
    if (length < 1) throw new Error('OTP length must be at least 1');

    // Calculate the range for the requested length
    // e.g., for 6 digits: min = 100,000; max = 999,999
    const min = 10 ** (length - 1);
    const max = 10 ** length - 1;

    // randomInt generates a secure random integer between [min, max]
    return randomInt(min, max + 1).toString();
};
