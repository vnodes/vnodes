import ejs from 'ejs';
import { readFileSync } from 'node:fs';

const template = readFileSync('template.ejs', { encoding: 'utf-8' });
const result = ejs.render(template, { name: 'Other' });

console.log(result);
