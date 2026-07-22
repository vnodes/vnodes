import type { Model } from './model.js';
import { ModelsManager } from './models-manager.js';
import { validateDataModel } from './validate-model.js';

describe('validateModel', () => {
  const idModel: Model = {
    type: 'abstract',
    name: 'Id',
    properties: [{ name: 'id', type: 'int' }],
    required: ['id'],
  };
  const userModel: Model = {
    name: 'User',
    type: 'model',
    extendings: ['Id'],
    properties: [
      { name: 'username', type: 'text', unique: true, required: true },
      { name: 'password', type: 'text', hash: true, required: true },
    ],
    required: ['id'],
  };

  const manager = new ModelsManager();

  beforeAll(() => {
    manager.setDataModel('User', () => userModel);
    manager.setDataModel('Id', () => idModel);
  });

  it('should validate the model', () => {
    validateDataModel(manager.getDataModel('User'));
  });
});
