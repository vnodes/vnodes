import { Prop } from '@vnodes/property';

export class OtpReadDto {
    @Prop({}) id?: number;
    @Prop({ required: false }) value?: string;
    @Prop({}) userId: number;
}
