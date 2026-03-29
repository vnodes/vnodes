import { sampleDb } from './sample-db.js';

describe('sampleDb', () => {
  it('should work', () => {
    expect(sampleDb()).toEqual('sampleDb');
  })
})
