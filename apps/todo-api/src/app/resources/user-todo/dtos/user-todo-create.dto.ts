import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserTodoCreateDto
{
@Prop({ type: Number }) userId: number;
@Prop({ type: Number }) todoId: number
}