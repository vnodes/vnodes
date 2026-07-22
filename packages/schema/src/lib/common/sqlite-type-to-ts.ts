export const sqliteTypeToTs = {
  // --- INTEGER Storage Class (Integer Affinity) ---
  int: 'number',
  integer: 'number',
  tinyint: 'number',
  smallint: 'number',
  mediumint: 'number',
  int2: 'number',
  int8: 'BigInt', // Maps to BigInt for 64-bit safe handling
  bigint: 'BigInt',
  unsigned_big_int: 'BigInt',

  // --- TEXT Storage Class (Text Affinity) ---
  character: 'string',
  varchar: 'string',
  varying_character: 'string',
  nchar: 'string',
  native_character: 'string',
  nvarchar: 'string',
  text: 'string',
  clob: 'string',
  uuid: 'string', // SQLite stores UUIDs as standard text strings

  // --- NONE Storage Class (Blob Affinity) ---
  blob: 'Buffer', // Node.js Buffer / Uint8Array

  // --- REAL Storage Class (Real Affinity) ---
  real: 'number',
  double: 'number',
  'double precision': 'number',
  float: 'number',

  // --- NUMERIC Storage Class (Numeric Affinity) ---
  numeric: 'string', // Kept as string to preserve decimal precision without JS float rounding
  decimal: 'string',
  boolean: 'boolean', // SQLite treats booleans as 0 or 1 internally, but Prisma abstracts it to boolean
  date: 'Date', // ISO8601 strings or integers parsed into JS Date objects
  datetime: 'Date',
  timestamp: 'Date',
} as const;
