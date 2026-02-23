import { Prop } from '@vnodes/property';

export class RoleReadDto {
    @Prop({}) id?: number;
    @Prop({}) name: string;
}
