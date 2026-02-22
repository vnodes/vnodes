import { PickType } from '@nestjs/swagger';
import { Prop } from '@vnodes/property';
import { CredentialDto } from './credential.dto.js';

export class LoginWithOptDto extends PickType(CredentialDto, ['username']) {
    @Prop() opt: string;
}
