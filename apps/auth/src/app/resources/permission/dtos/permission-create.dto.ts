import { Prop } from '@vnodes/property';

export class PermissionCreateDto {
    @Prop({}) scope: string;
    @Prop({}) resource: string;
    @Prop({}) operation: string;
}
