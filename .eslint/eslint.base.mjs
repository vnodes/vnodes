import nx from '@nx/eslint-plugin';
import common from './common.mjs';
import dependencyCheck from './dependency-check.mjs';
import moduleBoundries from './module-boundries.mjs';
import noUndefined from './no-undefined.mjs';

export default [
  ...common,
  ...dependencyCheck,
  ...moduleBoundries,
  ...noUndefined
];
