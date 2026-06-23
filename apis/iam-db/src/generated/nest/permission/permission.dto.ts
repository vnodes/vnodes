
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class PermissionReadDto {
@Prop({type: Number}) id?: number;
@Prop({type: Date}) createdAt?: Date;
@Prop({type: Date}) updatedAt?: Date;
@Prop({type: Date}) deletedAt?: Date;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String}) name?: string;
}
export class PermissionQueryDto extends BaseQueryDto {
 @Prop({ enum: P.PermissionScalarFieldEnum }) distinct?: P.PermissionScalarFieldEnum;
 @Prop({ enum: P.PermissionScalarFieldEnum }) orderBy?: P.PermissionScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class PermissionCreateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true,minLength: 3}) name: string;
}
export class PermissionUpdateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true,minLength: 3}) name: string;
}