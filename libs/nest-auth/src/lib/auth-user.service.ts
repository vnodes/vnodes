import { NotImplementedException } from '@nestjs/common';

export type Permissions = {
    [scope: string]:
        | boolean
        | {
              [resourceName: string]:
                  | boolean
                  | {
                        [operationName: string]: boolean;
                    };
          };
};

export class AuthUser {
    username: string;
    password: string;
    permissions: Permissions;
}

export class AuthUserService {
    findByUsername(username: string): AuthUser {
        throw new NotImplementedException(username);
    }
}
