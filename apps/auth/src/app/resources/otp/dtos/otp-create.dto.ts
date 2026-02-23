import { Prop } from '@vnodes/property';

export class OtpCreateDto {
    @Prop({ required: false }) value?: string;
    @Prop({}) userId: number;
}
