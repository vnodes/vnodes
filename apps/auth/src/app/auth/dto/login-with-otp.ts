import { Prop } from '@vnodes/property';

export class LoginWithOptDto {
    @Prop() username: string;
    @Prop() opt: string;
}
