import { Prop } from '@vnodes/property';

export class PermissionReadDto {
    @Prop({}) id?: number;
    @Prop({}) createdAt?: Date;
    @Prop({}) updatedAt: Date;
    @Prop({ required: false }) deletedAt?: Date;
    @Prop({}) scope: string;
    @Prop({}) resource: string;
    @Prop({}) operation: string;
}
