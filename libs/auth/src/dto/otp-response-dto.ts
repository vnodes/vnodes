import { Prop } from '@vnodes/property';

export class OtpResponseDto {
    @Prop() otp: string;
    constructor(data: OtpResponseDto) {
        Object.assign(this, data);
    }
}
