import { PickType } from '@nestjs/swagger';
import { CredentialDto } from './credential.dto.js';

export class ForgotPasswordDto extends PickType(CredentialDto, ['username']) {}
