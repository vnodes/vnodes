import { Prop } from '@vnodes/property';

export class LoginDto {
    @Prop({ required: true, format: 'email' }) username: string;
    @Prop({ required: true, format: 'password' }) password: string;
}
