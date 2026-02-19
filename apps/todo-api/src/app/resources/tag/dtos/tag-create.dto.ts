import { Prop } from '@vnodes/property';
import * as P from '../../../prisma/client.js';

export class TagCreateDto
{
@Prop({ type: String }) value: string;
@Prop({ type: String,required: false }) description?: string
}