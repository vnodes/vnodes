import { Prop } from '@vnodes/property';

export class LoginWithOtpDto {
    @Prop({ required: true, format: 'email' }) username: string;
    @Prop({ required: true, minLength: 6 }) otp: string;
}
