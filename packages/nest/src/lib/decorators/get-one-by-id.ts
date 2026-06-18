import { Get } from '@nestjs/common';
import { ApiParam } from '@nestjs/swagger';
import { ResourcePathName, ResourcePaths } from '../constants/resource-paths.js';

export function GetOneById(): MethodDecorator {
  return (...args) => {
    [Get(ResourcePaths.BY_ID), ApiParam({ name: ResourcePathName.ID })].forEach((e) => e(...args));
  };
}
