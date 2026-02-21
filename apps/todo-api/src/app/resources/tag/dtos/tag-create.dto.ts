import { Prop } from '@vnodes/property';

export class TagCreateDto
{
@Prop({  }) value: string;
@Prop({ required: false }) description?: string
}