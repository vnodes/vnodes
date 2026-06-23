
import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class AccessTokenReadDto {
@Prop({type: Number}) id?: number;
@Prop({type: Date}) createdAt?: Date;
@Prop({type: Date}) updatedAt?: Date;
@Prop({type: Date}) deletedAt?: Date;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String}) name?: string;
@Prop({type: Boolean}) isExpired?: boolean;
}
export class AccessTokenQueryDto extends BaseQueryDto {
 @Prop({ enum: P.AccessTokenScalarFieldEnum }) distinct?: P.AccessTokenScalarFieldEnum;
 @Prop({ enum: P.AccessTokenScalarFieldEnum }) orderBy?: P.AccessTokenScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class AccessTokenCreateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String,required: true}) token: string;
@Prop({type: Boolean}) isExpired?: boolean;
}
export class AccessTokenUpdateDto {
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) name: string;
@Prop({type: String,required: true}) token: string;
@Prop({type: Boolean}) isExpired?: boolean;
}