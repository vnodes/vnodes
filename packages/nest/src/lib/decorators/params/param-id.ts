import { Param, ParseIntPipe } from '@nestjs/common';
import { ResourcePathName } from '../../constants/resource-paths.js';

export function ParamId(): ParameterDecorator {
  return (...args) => {
    Param(ResourcePathName.ID, ParseIntPipe)(...args);
  };
}
