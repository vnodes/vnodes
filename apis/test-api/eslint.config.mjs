import { readJsonFile } from '@nx/devkit';
import baseConfig from '../../eslint.config.mjs';
import allowSelfImport from '../../.eslint/allow-self-import.mjs';

export default [...baseConfig, ...allowSelfImport];
