import { type PropertyOptions } from './property-options.js';

export function Prop(options: PropertyOptions): PropertyDecorator {
  return (...args) => {
    console.log(options);
    console.log(args);

    // - [ ] Create property validation decorator
    // - [ ] Each type should have its own validation decorator function and in different files
    // - [ ] Only export the `Prop` decorator from the library
    // - [ ] If property type is not provided, use the reflector the identify the property type programatically.
    // - [ ] Implement each validation function in the class-validator library such as @IsEmail() @IsStrongPassword()
    // - [ ] Normalize the property options into ApiPropertyOptions for @ApiPropery(normalizedOptions) decorator.
    // - [ ] Make sure the required/nullable options are correctly passed to the api property options.
    // - [ ] By default, each property is considered optional! Not required.
  };
}
