import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserTodoUpdateDto
{
@Prop({ type: Number,required: false })
userId? : number;
@Prop({ type: Number,required: false })
todoId? : number
}