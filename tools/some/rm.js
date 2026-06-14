const { rmSync } = require('node:fs');

rmSync('./some', { recursive: true });
