import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class HttpHookReadDto {
@Prop({type: Number}) id?: number;
@Prop({type: Date}) createdAt?: Date;
@Prop({type: Date}) updatedAt?: Date;
@Prop({type: Date}) deletedAt?: Date;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String}) name?: string;
@Prop({type: String}) description?: string;
@Prop({type: Number}) retryCount?: number;
@Prop({type: Number}) failureCount?: number;
@Prop({type: Date}) lastFailureAt?: Date;
@Prop({type: Date}) lastSuccessAt?: Date;
}
export class HttpHookQueryDto extends BaseQueryDto {
 @Prop({ enum: P.HttpHookScalarFieldEnum }) distinct?: P.HttpHookScalarFieldEnum;
 @Prop({ enum: P.HttpHookScalarFieldEnum }) orderBy?: P.HttpHookScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class HttpHookCreateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String}) description?: string;
@Prop({type: String,required: true,format: 'url'}) url: string;
@Prop({type: Number}) retryCount?: number;
@Prop({type: Number}) failureCount?: number;
@Prop({type: Date}) lastFailureAt?: Date;
@Prop({type: Date}) lastSuccessAt?: Date;
}
export class HttpHookUpdateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String}) description?: string;
@Prop({type: String,required: true,format: 'url'}) url: string;
@Prop({type: Number}) retryCount?: number;
@Prop({type: Number}) failureCount?: number;
@Prop({type: Date}) lastFailureAt?: Date;
@Prop({type: Date}) lastSuccessAt?: Date;
}