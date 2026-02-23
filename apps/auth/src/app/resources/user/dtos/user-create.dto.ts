import { Prop } from '@vnodes/property';

export class UserCreateDto {
    @Prop({}) uuid: string;
    @Prop({}) fullName: string;
    @Prop({ format: 'email' }) username: string;
    @Prop({ format: 'password' }) password: string;
    @Prop({ required: false }) isEmailVerified?: boolean;
}
