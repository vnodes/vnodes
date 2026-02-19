import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class UserUpdateDto
{
@Prop({ type: String,required: false,maxLength: 255 })
firstName? : string;
@Prop({ type: String,required: false,maxLength: 255 })
lastName? : string;
@Prop({ type: String,required: false,maxLength: 255 })
middleName? : string
}