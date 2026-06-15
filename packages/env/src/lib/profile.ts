export enum Profile {
  /**
   * Disable the authentication and autorization under development/test prfile
   */
  DEV_NO_AUTH = 'DEV_NO_AUTH',

  /**
   * Development/test profile
   */
  DEV = 'DEV',

  /**
   * Production profile
   */
  PROD = 'PROD',

  /**
   * Disable all write operations for regular users but the developer. This might be used for fixing initial database eed or bulk data entry on request
   */
  PROD_DEV_ONLY = 'PROD_DEV_ONLY',
}
