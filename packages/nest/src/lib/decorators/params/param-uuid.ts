import { Param, ParseUUIDPipe } from '@nestjs/common';
import { ResourcePathName } from '../../constants/resource-paths.js';

export function ParamUuid(): ParameterDecorator {
  return (...args) => {
    Param(ResourcePathName.ID, ParseUUIDPipe)(...args);
  };
}
