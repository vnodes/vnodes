import { Prop } from '@vnodes/property';

export class CredentialDto {
    @Prop() username: string;
    @Prop() password: string;
}
