import { WORKSPACE_VERSION } from './constants.js';

describe('constants', () => {
  it('should get the workspace version', () => {
    expect(WORKSPACE_VERSION).toBeDefined();
  });
});
