
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class HttpHookEventReadDto {
@Prop({type: Number}) httpHookId?: number;
@Prop({type: Number}) eventId?: number;
}
export class HttpHookEventQueryDto extends BaseQueryDto {
 @Prop({ enum: P.HttpHookEventScalarFieldEnum }) distinct?: P.HttpHookEventScalarFieldEnum;
 @Prop({ enum: P.HttpHookEventScalarFieldEnum }) orderBy?: P.HttpHookEventScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class HttpHookEventCreateDto {
@Prop({type: Number,required: true}) httpHookId: number;
@Prop({type: Number,required: true}) eventId: number;
}
export class HttpHookEventUpdateDto {
@Prop({type: Number,required: true}) httpHookId: number;
@Prop({type: Number,required: true}) eventId: number;
}