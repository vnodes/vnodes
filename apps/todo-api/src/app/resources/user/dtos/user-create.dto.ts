import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserCreateDto
{
@Prop({ type: String,maxLength: 255 }) firstName: string;
@Prop({ type: String,maxLength: 255 }) lastName: string;
@Prop({ type: String,maxLength: 255 }) middleName: string
}