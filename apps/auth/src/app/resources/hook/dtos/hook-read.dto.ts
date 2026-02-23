import { Prop } from '@vnodes/property';

export class HookReadDto {
    @Prop({}) id?: number;
    @Prop({}) url: string;
    @Prop({}) event: string;
}
