import { Prop } from '@vnodes/property';

export class AuditReadDto {
    @Prop({}) id?: number;
    @Prop({}) createdAt?: Date;
    @Prop({}) status: string;
    @Prop({}) scope: string;
    @Prop({}) resource: string;
    @Prop({}) operation: string;
    @Prop({}) input: string;
    @Prop({}) actorId: string;
}
