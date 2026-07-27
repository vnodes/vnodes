import { brandEmail } from './branded-email.js';

describe('brandEmail', () => {
  it('should create a brand email', () => {
    expect(brandEmail('some@gmail.com', 'brand')).toEqual(
      'some+brand@gmail.com',
    );
  });
});
