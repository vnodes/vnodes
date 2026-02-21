import { Prop } from '@vnodes/property';

export class SessionCreateDto {
    @Prop({}) userId: number;
    @Prop({ required: false }) ipAddress?: string;
    @Prop({ required: false }) deviceId?: string;
    @Prop({}) token: string;
}
