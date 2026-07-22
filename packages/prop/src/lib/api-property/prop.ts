import { ApiProperty, type ApiPropertyOptions } from '@nestjs/swagger';
import { DecoratorList } from '../utils/decorator-list.js';
import { PropValidation } from '../validation/prop.js';
import type { PropertyOptions } from '../validation/property-options.js';

export {
  DeepPartialType,
  IntersectionType,
  OmitType,
  PartialType,
  PickType
} from '@nestjs/swagger';

export function Prop(propertyOptions?: PropertyOptions): PropertyDecorator {
  return (...args) => {
    const po: PropertyOptions = { ...propertyOptions };
    const d = new DecoratorList();
    const propertyType = Reflect.getMetadata('design:type', args[0], args[1]);
    const isArray = propertyType === Array;
    const type = isArray ? po.type : propertyType;
    const required = po.required === true;

    if (type === undefined || type === null) {
      throw new Error('Type could not infered!');
    }

    d.push(PropValidation(po));

    const apiPropertyOptions: ApiPropertyOptions = {};

    apiPropertyOptions.type = type;

    if (po.enum) apiPropertyOptions.enum = po.enum;
    if (po.isIn) apiPropertyOptions.enum = po.isIn;
    if (po.isNotIn) apiPropertyOptions.not = { enum: po.isNotIn };
    if (po.description) apiPropertyOptions.description = po.description;
    if (po.default) apiPropertyOptions.default = po.default;
    if (po.example) apiPropertyOptions.example = po.example;
    if (po.examples) apiPropertyOptions.examples = po.examples;
    if (po.readOnly) apiPropertyOptions.example = po.readOnly;
    if (isArray) apiPropertyOptions.isArray = true;
    apiPropertyOptions.required = required;

    d.push(ApiProperty({ ...apiPropertyOptions }));

    d.forEach((e) => e(...args));
  };
}
