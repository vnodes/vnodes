import { PickType } from '@nestjs/swagger';
import { CredentialDto } from './credential.dto.js';

export class UpdatePasswordDto extends PickType(CredentialDto, ['password']) {}
