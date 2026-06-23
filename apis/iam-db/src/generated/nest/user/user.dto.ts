import { BaseQueryDto } from '@vnodes/prisma';
import { Prop } from '@vnodes/prop';
import { Prisma as P } from '../../prisma/client.js';
export class UserReadDto {
@Prop({type: Number}) id?: number;
@Prop({type: String}) uuid?: string;
@Prop({type: Date}) createdAt?: Date;
@Prop({type: Date}) updatedAt?: Date;
@Prop({type: Date}) deletedAt?: Date;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String}) username?: string;
@Prop({type: String}) password?: string;
@Prop({type: Boolean}) isTwoFactorAuthEnabled?: boolean;
@Prop({type: Date}) lastLoginAt?: Date;
}
export class UserQueryDto extends BaseQueryDto {
 @Prop({ enum: P.UserScalarFieldEnum }) distinct?: P.UserScalarFieldEnum;
 @Prop({ enum: P.UserScalarFieldEnum }) orderBy?: P.UserScalarFieldEnum;
 @Prop({ enum: P.SortOrder }) orderDir?: P.SortOrder;
}
export class UserCreateDto {
@Prop({type: String}) uuid?: string;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) username: string;
@Prop({type: String,required: true,format: 'password'}) password: string;
@Prop({type: Boolean}) isTwoFactorAuthEnabled?: boolean;
@Prop({type: Date}) lastLoginAt?: Date;
}
export class UserUpdateDto {
@Prop({type: String}) uuid?: string;
@Prop({type: Boolean}) isActive?: boolean;
@Prop({type: Number}) updatedById?: number;
@Prop({type: String,required: true}) username: string;
@Prop({type: String,required: true,format: 'password'}) password: string;
@Prop({type: Boolean}) isTwoFactorAuthEnabled?: boolean;
@Prop({type: Date}) lastLoginAt?: Date;
}