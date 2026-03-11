import { Controller, createParamDecorator, Get, Param, ParseIntPipe } from '@vnodes/nestjs/common';
import { ApiParam } from '@vnodes/nestjs/swagger';

export class IdNumber extends Number {}
export class SomeString extends String {}
export class OtherDate extends Date {}

const UserId = createParamDecorator((data, context) => {
    return '9999';
});

function AutoWire(): ClassDecorator {
    return (target) => {
        Controller(target.name)(target);

        const methods = Object.getOwnPropertyNames(target.prototype).filter((e) => e !== 'constructor');

        for (const methodName of methods) {
            {
                const fnStr = target.prototype[methodName].toString();
                const paramNames = fnStr
                    .slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')'))
                    .match(/([^\s,]+)/g) as string[];

                const descriptor = Object.getOwnPropertyDescriptor(target.prototype, methodName);
                if (!descriptor) throw new Error('No Descriptpro');

                const idParam = paramNames[0];
                if (idParam === 'id') {
                    Get(':id')(target.prototype, methodName, descriptor);
                    Param('id', ParseIntPipe)(target.prototype, methodName, 0);
                    ApiParam({ name: 'id', type: 'integer' })(target, methodName, descriptor);
                } else if (idParam === 'uuid') {
                    Get(':uuid')(target.prototype, methodName, descriptor);
                    Param('uuid')(target.prototype, methodName, 0);
                    ApiParam({ name: 'uuid', type: 'string' })(target, methodName, descriptor);
                }

                if (paramNames.includes('userId')) {
                    UserId()(target.prototype, methodName, paramNames.indexOf('userId'));
                }
            }
        }
    };
}

@AutoWire()
export class AppController {
    findMany(uuid: string, userId: SomeString, other: OtherDate) {
        return { id: uuid, userId, other };
    }
}
