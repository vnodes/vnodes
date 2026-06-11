import { applyDecorators, Get } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';

export const GetOneById = () =>
  applyDecorators(Get(':id'), ApiParam({ name: 'id' }));
