import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class SampleReadDto {
@Prop({type: Number}) id?: number;
@Prop({type: Date}) createdAt?: Date;
@Prop({type: Date}) updatedAt?: Date;
@Prop({type: Date}) deletedAt?: Date;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String}) name?: string;
@Prop({type: String}) description?: string;
}
export class SampleQueryDto extends BaseQueryDto {
 @Prop({ enum: P.SampleScalarFieldEnum }) distinct?: P.SampleScalarFieldEnum;
 @Prop({ enum: P.SampleScalarFieldEnum }) orderBy?: P.SampleScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class SampleCreateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String}) description?: string;
}
export class SampleUpdateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String}) description?: string;
}