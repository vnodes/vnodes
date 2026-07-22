/**
 * Represents a parsed PostgreSQL interval.
 * All properties are optional because Postgres only includes the fields that are non-zero.
 */
export type Interval = {
  years?: number;
  months?: number;
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};
