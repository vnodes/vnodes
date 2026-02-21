import { Prop } from '@vnodes/property';

export class AccessTokenCreateDto
{
@Prop({  }) name: string;
@Prop({ required: false }) description?: string;
@Prop({  }) token: string
}