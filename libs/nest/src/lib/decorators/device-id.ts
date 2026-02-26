import { createParamDecorator } from '@nestjs/common';
import type { Request } from 'express';
/**
 * request.headers['X-device-id]
 * Whenever user interact with the system, the device is given a uuid
 * and stored in the local-storage if available.
 * Then the X-device-id is passed to the server with all requests
 */
export const DeviceId = createParamDecorator((_data, context) => {
    const req = context.switchToHttp().getRequest<Request>();
    return req.headers['X-device-id'];
});
