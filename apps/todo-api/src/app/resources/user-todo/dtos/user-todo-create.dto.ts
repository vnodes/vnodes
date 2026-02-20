import { Prop } from '@vnodes/property';

export class UserTodoCreateDto {
    @Prop({ type: Number }) userId: number;
    @Prop({ type: Number }) todoId: number;
}
