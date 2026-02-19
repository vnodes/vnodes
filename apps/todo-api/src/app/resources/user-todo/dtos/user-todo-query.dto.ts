import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserTodoQueryDto {
@Prop({ type: Number, format: 'int32', minimum: 0, default: 20, required: false }) take?: number;
@Prop({ type: Number, format: 'int32', minimum: 0, default: 0, required: false }) skip?: number;
@Prop({ type: String, required: false }) search?: string;
@Prop({ type: String, enum: P.Prisma.UserTodoScalarFieldEnum, required: false, default: 'id' })
orderBy: P.Prisma.UserTodoScalarFieldEnum;
@Prop({ type: String, enum: P.Prisma.SortOrder, required: false, default: 'asc' }) orderDir?: P.Prisma.SortOrder;
@Prop({ type: Boolean, default: false, required: false }) withDeleted?: boolean;
}