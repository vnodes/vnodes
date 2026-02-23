import { Prop } from '@vnodes/property';

export class SessionCreateDto {
    @Prop({ required: false }) expiresAt?: Date;
    @Prop({ required: false }) lastUsedAt?: Date;
    @Prop({}) userId: number;
    @Prop({ required: false }) deviceId?: string;
    @Prop({ required: false }) ip?: string;
    @Prop({ required: false }) hostname?: string;
    @Prop({ required: false }) city?: string;
    @Prop({ required: false }) region?: string;
    @Prop({ required: false }) country?: string;
    @Prop({ required: false }) loc?: string;
    @Prop({ required: false }) org?: string;
    @Prop({ required: false }) postal?: string;
    @Prop({ required: false }) timezone?: string;
    @Prop({ required: false }) agent?: string;
}
