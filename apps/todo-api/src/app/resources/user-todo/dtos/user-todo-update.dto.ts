import { Prop } from '@vnodes/property';

export class UserTodoUpdateDto {
    @Prop({ type: Number, required: false })
    userId?: number;
    @Prop({ type: Number, required: false })
    todoId?: number;
}
