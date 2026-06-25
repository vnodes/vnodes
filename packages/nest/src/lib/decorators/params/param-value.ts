import { Param, ParseBoolPipe, type PipeTransform, type Type } from '@nestjs/common';
import { ResourcePathName } from '../../constants/resource-paths.js';

export function ParamValue(...pipes: Type<PipeTransform>[]): ParameterDecorator {
  return () => {
    Param(ResourcePathName.VALUE, ...pipes);
  };
}

export function ParamBooleanValue(): ParameterDecorator {
  return (...args) => {
    ParamValue(ParseBoolPipe)(...args);
  };
}
