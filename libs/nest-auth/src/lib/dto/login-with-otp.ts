import { Prop } from '@vnodes/property';

export class LoginWithOtpDto {
    @Prop({ format: 'email' }) username: string;
    @Prop() otp: string;
}
