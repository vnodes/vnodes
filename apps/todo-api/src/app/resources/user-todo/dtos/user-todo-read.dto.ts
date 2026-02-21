import { Prop } from '@vnodes/property';

export class UserTodoReadDto {
    @Prop({}) id?: number;
    @Prop({}) createdAt?: Date;
    @Prop({}) updatedAt: Date;
    @Prop({ required: false }) deletedAt?: Date;
    @Prop({}) userId: number;
    @Prop({}) todoId: number;
}
