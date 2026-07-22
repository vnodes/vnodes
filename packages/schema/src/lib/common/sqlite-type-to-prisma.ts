export const sqliteTypeToPrisma = {
  // --- INTEGER Storage Class (Integer Affinity) ---
  int: 'Int',
  integer: 'Int',
  tinyint: 'Int',
  smallint: 'Int',
  mediumint: 'Int',
  int2: 'Int',
  int8: 'BigInt',
  bigint: 'BigInt',
  unsigned_big_int: 'BigInt',

  // --- TEXT Storage Class (Text Affinity) ---
  character: 'String',
  varchar: 'String',
  varying_character: 'String',
  nchar: 'String',
  native_character: 'String',
  nvarchar: 'String',
  text: 'String',
  clob: 'String',
  uuid: 'String',

  // --- NONE Storage Class (Blob Affinity) ---
  blob: 'Bytes',

  // --- REAL Storage Class (Real Affinity) ---
  real: 'Float',
  double: 'Float',
  'double precision': 'Float',
  float: 'Float',

  // --- NUMERIC Storage Class (Numeric Affinity) ---
  numeric: 'Decimal',
  decimal: 'Decimal',
  boolean: 'Boolean',
  date: 'DateTime',
  datetime: 'DateTime',
  timestamp: 'DateTime',
} as const;
