import { Prop } from '@vnodes/property';

export class AuditReadDto
{
@Prop({  }) id?: number;
@Prop({  }) createdAt?: Date;
@Prop({  }) updatedAt: Date;
@Prop({ required: false }) deletedAt?: Date;
@Prop({  }) actorId: string;
@Prop({  }) resource: string;
@Prop({  }) operation: string;
@Prop({  }) input: string
}