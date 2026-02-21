import { Prop } from '@vnodes/property';

export class AccessTokenPermissionCreateDto {
    @Prop({}) accessTokenId: number;
    @Prop({}) permissionId: number;
}
