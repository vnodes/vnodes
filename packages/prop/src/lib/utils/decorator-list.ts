export class DecoratorList extends Array<PropertyDecorator> {
  pushIf<V>(value: V | undefined | null, ...handlers: ((value: V) => PropertyDecorator)[]) {
    if (value !== undefined && value !== null) {
      this.push(...handlers.map((d) => d(value)));
    }
  }
}
