import { join } from 'node:path';
import { dirsGenerator } from './dirs.js';

describe('dirs', () => {
  it('should read dirs', async () => {
    const d = dirsGenerator(join(__dirname, '..'));
    console.log(await d.next());
    console.log(await d.next());
  });
});
