import { prismaPlugin } from './prisma-plugin.js';

describe('prismaPlugin', () => {
  it('should work', () => {
    expect(prismaPlugin()).toEqual('prisma-plugin');
  })
})
