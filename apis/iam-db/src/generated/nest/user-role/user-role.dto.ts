
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class UserRoleReadDto {
@Prop({type: Number}) userId?: number;
@Prop({type: Number}) roleId?: number;
}
export class UserRoleQueryDto extends BaseQueryDto {
 @Prop({ enum: P.UserRoleScalarFieldEnum }) distinct?: P.UserRoleScalarFieldEnum;
 @Prop({ enum: P.UserRoleScalarFieldEnum }) orderBy?: P.UserRoleScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class UserRoleCreateDto {
@Prop({type: Number,required: true}) userId: number;
@Prop({type: Number,required: true}) roleId: number;
}
export class UserRoleUpdateDto {
@Prop({type: Number,required: true}) userId: number;
@Prop({type: Number,required: true}) roleId: number;
}