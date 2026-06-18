export const OperationName = {
  /**
   * Operations with a single create operation
   */
  CREATE_ONE: 'CREATE_ONE',

  /**
   * Operaions with multiple create operations
   */
  CREATE_MANY: 'CREATE_MANY',

  /**
   * Operations with a single read operation such as read by id.
   */
  FIND_ONE: 'FIND_ONE',

  /**
   * Operations with many read operations such as find all
   */
  FIND_MANY: 'FIND_MANY',

  /**
   * Operations with a single update operation such as update by id
   */
  UPDATE_ONE: 'UPDATE_ONE',

  /**
   * Operations with multiple update operations such as update by status
   */
  UPDATE_MANY: 'UPDATE_MANY',

  /**
   * Operation with a single delete operation such as delete by id
   */
  DELETE_ONE: 'DELETE_ONE',

  /**
   * Operation with a single delete operation such as delete by status
   */
  DELETE_MANY: 'DELETE_MANY',

  /**
   * Operation with multiple sub operations such as creating a new user
   */
  MANAGE: 'MANAGE',

  FIND_ONE_OWN: 'FIND_ONE_OWN',
  CREATE_ONE_OWN: 'CREATE_ONE_OWN',
  UPDATE_ONE_OWN: 'UPDATE_ONE_OWN',
  DELETE_ONE_OWN: 'DELETE_ONE_OWN',

  FIND_MANY_OWN: 'FIND_MANY_OWN',
  CREATE_MANY_OWN: 'CREATE_MANY_OWN',
  UPDATE_MANY_OWN: 'UPDATE_MANY_OWN',
  DELETE_MANY_OWN: 'DELETE_MANY_OWN',

  MANAGE_OWN: 'MANAGE_OWN',
} as const;

export type OperationName = keyof typeof OperationName;

export const OperationNames = Object.keys(OperationName) as Readonly<OperationName[]>;
