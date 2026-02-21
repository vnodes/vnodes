import { Prop } from '@vnodes/property';

export class ForgotPasswordDto {
    @Prop({ format: 'email' }) username: string;
}
