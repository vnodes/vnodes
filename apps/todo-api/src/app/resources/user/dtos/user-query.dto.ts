import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserQueryDto {
    @Prop({ type: Number, format: 'int32', minimum: 0, default: 20, required: false }) take?: number;
    @Prop({ type: Number, format: 'int32', minimum: 0, default: 0, required: false }) skip?: number;
    @Prop({ type: String, required: false }) search?: string;
    @Prop({ type: String, enum: P.Prisma.UserScalarFieldEnum, required: false, default: 'id' })
    orderBy: P.Prisma.UserScalarFieldEnum;
    @Prop({ type: String, enum: P.Prisma.SortOrder, required: false, default: 'asc' }) orderDir?: P.Prisma.SortOrder;
    @Prop({ type: Boolean, default: false, required: false }) withDeleted?: boolean;
}
