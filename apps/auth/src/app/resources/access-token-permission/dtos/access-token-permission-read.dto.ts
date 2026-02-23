import { Prop } from '@vnodes/property';

export class AccessTokenPermissionReadDto {
    @Prop({}) id?: number;
    @Prop({}) accessTokenId: number;
    @Prop({}) permissionId: number;
}
