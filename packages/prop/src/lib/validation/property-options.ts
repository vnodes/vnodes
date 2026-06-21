import type { ApiPropertyOptions } from '@nestjs/swagger';

export type OpenApiFormat =
  | 'int32'
  | 'int64'
  | 'float'
  | 'double'
  | 'byte'
  | 'binary'
  | 'date'
  | 'date-time'
  | 'time'
  | 'duration'
  | 'password'
  | 'email'
  | 'idn-email'
  | 'hostname'
  | 'idn-hostname'
  | 'ipv4'
  | 'ipv6'
  | 'uri'
  | 'uri-reference'
  | 'uri-template'
  | 'iri'
  | 'iri-reference'
  | 'uuid4'
  | 'uuid7'
  | 'json-pointer'
  | 'relative-json-pointer'
  | 'regex'
  | 'currency'
  | 'phone'
  | 'json';

export type PropertyOptions = ApiPropertyOptions & {
  type?: string | number | boolean | bigint | Date | object;
  isIn?: string[];
  isNotIn?: string[];
  format?: OpenApiFormat;

  exclude?: boolean;
  groups?: string[];
};
