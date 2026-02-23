import { Prop } from '@vnodes/property';

export class AuditCreateDto {
    @Prop({}) status: string;
    @Prop({}) scope: string;
    @Prop({}) resource: string;
    @Prop({}) operation: string;
    @Prop({}) input: string;
    @Prop({}) actorId: string;
}
