import { Prop } from '@vnodes/property';

export class UserRoleReadDto {
    @Prop({}) id?: number;
    @Prop({}) createdAt?: Date;
    @Prop({}) updatedAt: Date;
    @Prop({ required: false }) deletedAt?: Date;
    @Prop({}) userId: number;
    @Prop({}) roleId: number;
}
