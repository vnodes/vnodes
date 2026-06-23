
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class EventReadDto {
@Prop({type: Number}) id?: number;
@Prop({type: Date}) createdAt?: Date;
@Prop({type: Date}) updatedAt?: Date;
@Prop({type: Date}) deletedAt?: Date;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String}) name?: string;
@Prop({type: String}) description?: string;
}
export class EventQueryDto extends BaseQueryDto {
 @Prop({ enum: P.EventScalarFieldEnum }) distinct?: P.EventScalarFieldEnum;
 @Prop({ enum: P.EventScalarFieldEnum }) orderBy?: P.EventScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class EventCreateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String}) description?: string;
}
export class EventUpdateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String}) description?: string;
}