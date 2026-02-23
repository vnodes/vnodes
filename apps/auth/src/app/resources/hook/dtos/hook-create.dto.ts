import { Prop } from '@vnodes/property';

export class HookCreateDto {
    @Prop({}) url: string;
    @Prop({}) event: string;
}
