import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class TagUpdateDto
{
@Prop({ type: String,required: false })
value? : string;
@Prop({ type: String,required: false })
description? : string
}