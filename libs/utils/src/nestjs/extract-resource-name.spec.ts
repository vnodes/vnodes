import { extractResourceName } from './extract-resource-name.js';

describe('extractResourceName', () => {
    it.each`
        value                  | result
        ${'SampleController'}  | ${'Sample'}
        ${'SampleService'}     | ${'Sample'}
        ${'SampleMiddleware'}  | ${'Sample'}
        ${'SamplePipe'}        | ${'Sample'}
        ${'SampleInterceptor'} | ${'Sample'}
        ${'SampleModule'}      | ${'Sample'}
        ${'SampleCreateDto'}   | ${'Sample'}
        ${'SampleUpdateDto'}   | ${'Sample'}
        ${'SampleQueryDto'}    | ${'Sample'}
        ${'SampleModule'}      | ${'Sample'}
        ${'SampleFilter'}      | ${'Sample'}
        ${'SampleGuard'}       | ${'Sample'}
    `('extractResouceName($value) should return $result', ({ value, result }) => {
        expect(extractResourceName(value)).toEqual(result);
    });
});
