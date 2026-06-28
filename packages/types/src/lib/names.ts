import type { KeyOf, StringRecord } from './common.js';

export const Names = {
  pascal: 'pascal',
  camel: 'camel',
  kebab: 'kebab',
  snake: 'snake',
  constant: 'constant',
  title: 'title',
  sentence: 'sentence',
  lower: 'lower',
  upper: 'upper',
};

export type Names = StringRecord<typeof Names>;

export type Name = KeyOf<Names>;
