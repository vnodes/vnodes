import nx from '@nx/eslint-plugin';
import common from './common.mjs';
import dependencyCheck from './dependency-check.mjs';
import moduleBoundries from './module-boundries.mjs';
import noUndefined from './no-undefined.mjs';
import nodeProtocol from './node-protocol.mjs';
import typeImport from './type-import.mjs';

export default [
  ...common,
  ...dependencyCheck,
  ...moduleBoundries,
  ...noUndefined,
  ...nodeProtocol,
  ...typeImport,
];
