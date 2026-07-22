export const pgTypeToPrisma = {
  // --- Character / String Types ---
  text: 'String',
  varchar: 'String',
  'character varying': 'String',
  char: 'String',
  character: 'String',
  citext: 'String',
  uuid: 'String',
  xml: 'String',

  // --- Numeric Types ---
  smallint: 'Int',
  int2: 'Int',
  integer: 'Int',
  int: 'Int',
  int4: 'Int',
  real: 'Float',
  float4: 'Float',
  'double precision': 'Float',
  float8: 'Float',
  bigint: 'bigint',
  int8: 'bigint',
  numeric: 'Decimal',
  decimal: 'Decimal',
  money: 'Decimal',

  // --- Date & Time Types ---
  date: 'DateTime',
  timestamp: 'DateTime',
  'timestamp without time zone': 'DateTime',
  timestamptz: 'DateTime',
  'timestamp with time zone': 'DateTime',
  time: 'DateTime',

  // Prisma represents TIME as DateTime (using a dummy date 1970-01-01)
  'time without time zone': 'DateTime',
  timetz: 'DateTime',
  'time with time zone': 'DateTime',

  // --- Boolean & Binary Types ---
  boolean: 'Boolean',
  bool: 'Boolean',
  bytea: 'Bytes',

  // --- JSON / Semi-Structured Types ---
  json: 'Json',
  jsonb: 'Json',

  // --- Network Address Types ---
  inet: 'String',
  cidr: 'String',
  macaddr: 'String',
  macaddr8: 'String',

  // --- Bit String Types ---
  bit: 'String',
  'bit varying': 'String',
  varbit: 'String',

  txid_snapshot: 'BigInt',

  oid: 'Int',
} as const;
