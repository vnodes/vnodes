
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class RolePermissionReadDto {
@Prop({type: Number}) roleId?: number;
@Prop({type: Number}) permissionId?: number;
}
export class RolePermissionQueryDto extends BaseQueryDto {
 @Prop({ enum: P.RolePermissionScalarFieldEnum }) distinct?: P.RolePermissionScalarFieldEnum;
 @Prop({ enum: P.RolePermissionScalarFieldEnum }) orderBy?: P.RolePermissionScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class RolePermissionCreateDto {
@Prop({type: Number,required: true}) roleId: number;
@Prop({type: Number,required: true}) permissionId: number;
}
export class RolePermissionUpdateDto {
@Prop({type: Number,required: true}) roleId: number;
@Prop({type: Number,required: true}) permissionId: number;
}