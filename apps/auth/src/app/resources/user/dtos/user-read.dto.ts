import { Prop } from '@vnodes/property';

export class UserReadDto {
    @Prop({}) id?: number;
    @Prop({}) uuid: string;
    @Prop({}) createdAt?: Date;
    @Prop({}) updatedAt: Date;
    @Prop({ required: false }) deletedAt?: Date;
    @Prop({}) fullName: string;
    @Prop({ format: 'email' }) username: string;
    @Prop({ format: 'password' }) password: string;
    @Prop({ required: false }) isEmailVerified?: boolean;
}
