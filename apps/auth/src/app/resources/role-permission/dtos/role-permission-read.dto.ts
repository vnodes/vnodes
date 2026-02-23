import { Prop } from '@vnodes/property';

export class RolePermissionReadDto {
    @Prop({}) id?: number;
    @Prop({}) roleId: number;
    @Prop({}) permissionId: number;
}
