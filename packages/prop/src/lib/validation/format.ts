import {
  type ValidationOptions,
  IsCurrency,
  IsEmail,
  IsInt,
  IsIP,
  IsISO8601,
  IsJSON,
  IsNumber,
  IsStrongPassword,
  IsUrl,
  IsUUID,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { DecoratorList } from '../utils/decorator-list.js';
import type { OpenApiFormat } from './property-options.js';

/**
 * Apply validation by the {@link OpenApiFormat}
 * @param f
 * @param vo
 * @returns
 */
export function FomatValidation(
  format: OpenApiFormat,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  const f = format as OpenApiFormat;
  const vo = { ...validationOptions };

  return (...args) => {
    const d = new DecoratorList();

    if (f)
      switch (f) {
        case 'email': {
          d.push(IsEmail({}, vo));
          break;
        }
        case 'password': {
          d.push(
            IsStrongPassword(
              { minLength: 6, minNumbers: 1, minLowercase: 1, minSymbols: 1, minUppercase: 1 },
              vo,
            ),
          );
          break;
        }
        case 'currency': {
          d.push(IsCurrency({}, vo));
          break;
        }

        case 'int32':
        case 'int64':
        case 'float':
        case 'double':
        case 'duration':
        case 'byte': {
          d.push(IsNumber({}, vo));
          switch (f) {
            case 'int32':
            case 'int64': {
              d.push(IsInt(vo));
              break;
            }

            case 'byte': {
              d.push(Max(255, vo));
              d.push(Min(-255, vo));
              break;
            }
            case 'duration': {
              d.push(IsInt(vo));
              d.push(Min(0, vo));
              break;
            }
            case 'float':
            case 'double':
          }
          break;
        }
        case 'binary': {
          d.push(
            Matches(/^[01]{1,}$/, {
              ...vo,
              message: `The $property should be a valid binary string`,
            }),
          );
          break;
        }
        case 'time':
        case 'date-time':
        case 'date': {
          d.push(IsISO8601({}, vo));
          break;
        }
        case 'ipv4': {
          d.push(IsIP('4', vo));
          break;
        }
        case 'ipv6': {
          d.push(IsIP('6', vo));
          break;
        }
        case 'uri': {
          d.push(IsUrl({}, vo));
          break;
        }
        case 'uuid4': {
          d.push(IsUUID('4', vo));
          break;
        }
        case 'uuid7': {
          d.push(IsUUID('7', vo));
          break;
        }

        case 'json': {
          d.push(IsJSON(vo));
          break;
        }
        case 'idn-email':
        case 'idn-hostname':
        case 'hostname':
        case 'regex':
        case 'uri-reference':
        case 'uri-template':
        case 'iri':
        case 'iri-reference':
        case 'json-pointer':
        case 'relative-json-pointer': {
          // Ignore this
          break;
        }
      }
    d.forEach((e) => e(...args));
  };
}
