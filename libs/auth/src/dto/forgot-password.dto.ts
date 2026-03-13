import { Prop } from '@vnodes/property';

export class ForgotPasswordDto {
    @Prop({ required: true, format: 'email' }) username: string;
}
