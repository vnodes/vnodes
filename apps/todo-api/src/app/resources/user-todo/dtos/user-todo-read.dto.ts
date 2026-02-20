import { Prop } from '@vnodes/property';

export class UserTodoReadDto {
    @Prop({ type: Number }) id?: number;
    @Prop({ type: Date }) createdAt?: Date;
    @Prop({ type: Date }) updatedAt: Date;
    @Prop({ type: Date, required: false }) deletedAt?: Date;
    @Prop({ type: Number }) userId: number;
    @Prop({ type: Number }) todoId: number;
}
