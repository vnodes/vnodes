import { Prop } from '@vnodes/property';

export class UserCreateDto {
    @Prop({ format: 'email' }) username: string;
    @Prop({ format: 'password' }) password: string;
    @Prop({}) firstName: string;
    @Prop({}) lastName: string;
    @Prop({ required: false }) middleName?: string;
    @Prop({ required: false }) otp?: string;
}
