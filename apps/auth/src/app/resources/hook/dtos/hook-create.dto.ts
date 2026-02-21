import { Prop } from '@vnodes/property';

export class HookCreateDto {
    @Prop({}) url: string;
    @Prop({ required: false }) payload?: string;
    @Prop({}) event: string;
}
