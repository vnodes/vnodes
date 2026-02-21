import { Prop } from '@vnodes/property';

export class AccessTokenPermissionReadDto {
    @Prop({}) id?: number;
    @Prop({}) createdAt?: Date;
    @Prop({}) updatedAt: Date;
    @Prop({ required: false }) deletedAt?: Date;
    @Prop({}) accessTokenId: number;
    @Prop({}) permissionId: number;
}
