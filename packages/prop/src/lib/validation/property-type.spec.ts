import 'reflect-metadata';
describe('PropertyTYpe', () => {
  it('hsould get', () => {
    function Prop(): PropertyDecorator {
      return (...args) => {
        const propertyType = Reflect.getMetadata('design:type', args[0], args[1]);

        console.log(args[1], ' is ', propertyType);
      };
    }

    class Sample {
      @Prop() string: string;
      @Prop() number: number;
      @Prop() boolean: boolean;
      @Prop() Date: Date;
      @Prop() DatBigInte: bigint;
      @Prop() Array: string[];
      @Prop() samples: Sample;
    }

    console.log(Sample.name, '...end');
  });
});
