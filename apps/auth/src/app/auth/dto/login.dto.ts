import { Prop } from '@vnodes/property';

export class LoginDto {
    @Prop() username: string;
    @Prop() password: string;
}
