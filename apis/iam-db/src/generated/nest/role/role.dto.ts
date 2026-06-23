
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class RoleReadDto {
@Prop({type: Number}) id?: number;
@Prop({type: Date}) createdAt?: Date;
@Prop({type: Date}) updatedAt?: Date;
@Prop({type: Date}) deletedAt?: Date;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String}) name?: string;
@Prop({type: String}) description?: string;
}
export class RoleQueryDto extends BaseQueryDto {
 @Prop({ enum: P.RoleScalarFieldEnum }) distinct?: P.RoleScalarFieldEnum;
 @Prop({ enum: P.RoleScalarFieldEnum }) orderBy?: P.RoleScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class RoleCreateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true,minLength: 3}) name: string;
@Prop({type: String,minLength: 3}) description?: string;
}
export class RoleUpdateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true,minLength: 3}) name: string;
@Prop({type: String,minLength: 3}) description?: string;
}