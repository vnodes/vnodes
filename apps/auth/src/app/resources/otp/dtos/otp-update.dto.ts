import { PartialType } from '@nestjs/swagger';
import { OtpCreateDto } from './otp-create.dto.js';

export class OtpUpdateDto extends PartialType(OtpCreateDto) {}
