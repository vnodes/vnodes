#!/usr/bin/env node

import { updateJsonFile } from '@vnodes/fs';

updateJsonFile('package.json', (value) => value);
