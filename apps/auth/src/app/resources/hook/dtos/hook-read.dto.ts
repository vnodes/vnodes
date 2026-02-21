import { Prop } from '@vnodes/property';

export class HookReadDto
{
@Prop({  }) id?: number;
@Prop({  }) createdAt?: Date;
@Prop({  }) updatedAt: Date;
@Prop({ required: false }) deletedAt?: Date;
@Prop({  }) url: string;
@Prop({ required: false }) payload?: string;
@Prop({  }) event: string
}