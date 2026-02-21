import { Prop } from '@vnodes/property';

export class AuditCreateDto
{
@Prop({  }) actorId: string;
@Prop({  }) resource: string;
@Prop({  }) operation: string;
@Prop({  }) input: string
}