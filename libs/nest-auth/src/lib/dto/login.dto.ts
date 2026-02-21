import { Prop } from '@vnodes/property';

export class LoginDto {
    @Prop({ format: 'email' }) username: string;
    @Prop({ format: 'password' }) password: string;
}
