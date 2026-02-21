import { Prop } from '@vnodes/property';

export class UserRoleCreateDto {
    @Prop({}) userId: number;
    @Prop({}) roleId: number;
}
