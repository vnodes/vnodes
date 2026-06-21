import type { ApiPropertyOptions } from '@nestjs/swagger';

export type PropertyOptions = ApiPropertyOptions & {
  type?: string | number | boolean | bigint | Date | object;
  exclude?: boolean;
  groups?: string[];
};
