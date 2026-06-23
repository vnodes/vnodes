
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class AccessTokenPermissionReadDto {
@Prop({type: Number}) accessTokenId?: number;
@Prop({type: Number}) permissionId?: number;
}
export class AccessTokenPermissionQueryDto extends BaseQueryDto {
 @Prop({ enum: P.AccessTokenPermissionScalarFieldEnum }) distinct?: P.AccessTokenPermissionScalarFieldEnum;
 @Prop({ enum: P.AccessTokenPermissionScalarFieldEnum }) orderBy?: P.AccessTokenPermissionScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class AccessTokenPermissionCreateDto {
@Prop({type: Number,required: true}) accessTokenId: number;
@Prop({type: Number,required: true}) permissionId: number;
}
export class AccessTokenPermissionUpdateDto {
@Prop({type: Number,required: true}) accessTokenId: number;
@Prop({type: Number,required: true}) permissionId: number;
}