export const pgTypeToTs = {
  // --- Character / String Types ---
  text: 'string',
  varchar: 'string',
  'character varying': 'string',
  char: 'string',
  character: 'string',
  citext: 'string',
  uuid: 'string',
  xml: 'string',

  // --- Numeric Types ---
  smallint: 'number',
  int2: 'number',
  integer: 'number',
  int: 'number',
  int4: 'number',
  real: 'number',
  float4: 'number',
  'double precision': 'number',
  float8: 'number',
  bigint: 'BigInt',
  int8: 'BigInt',
  numeric: 'string', // Handled as string to preserve decimal precision
  decimal: 'string',
  money: 'string',

  // --- Date & Time Types ---
  date: 'Date',
  timestamp: 'Date',
  'timestamp without time zone': 'Date',
  timestamptz: 'Date',
  'timestamp with time zone': 'Date',
  time: 'string', // Handled as string (e.g., "14:30:00")
  'time without time zone': 'string',
  timetz: 'string',
  'time with time zone': 'string',
  interval: 'Types.Interval', // Usually parsed as an object (e.g., { hours: 2 })

  // --- Boolean & Binary Types ---
  boolean: 'boolean',
  bool: 'boolean',
  bytea: 'Buffer', // Node.js Buffer / Uint8Array

  // --- JSON / Semi-Structured Types ---
  json: 'Types.JsonValue',
  jsonb: 'Types.JsonValue',

  // --- Network Address Types ---
  inet: 'string',
  cidr: 'string',
  macaddr: 'string',
  macaddr8: 'string',

  // --- Geometric Types ---
  point: 'Types.Point',
  line: 'string',
  lseg: 'string',
  box: 'string',
  path: 'string',
  polygon: 'string',
  circle: 'string',

  // --- Bit String Types ---
  bit: 'string',
  'bit varying': 'string',
  varbit: 'string',

  // --- Specialized / Internal Types ---
  tsvector: 'string',
  tsquery: 'string',
  txid_snapshot: 'string',
  pg_lsn: 'string',
  oid: 'number',
} as const;
