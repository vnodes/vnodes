import 'reflect-metadata';
import { PropValidation } from './prop.js';

import { Expose } from 'class-transformer';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { vi } from 'vitest';

vi.mock('class-validator', async () => {
  const actual = await import('class-validator');

  return {
    ...actual,
    IsOptional: vi.fn().mockReturnValue(() => ({})),
    IsDefined: vi.fn().mockReturnValue(() => ({})),
    IsString: vi.fn().mockReturnValue(() => ({})),
    MinLength: vi.fn().mockReturnValue(() => ({})),
    MaxLength: vi.fn().mockReturnValue(() => ({})),
    IsUUID: vi.fn().mockReturnValue(() => ({})),
    IsEmail: vi.fn().mockReturnValue(() => ({})),
    IsStrongPassword: vi.fn().mockReturnValue(() => ({})),
  };
});

vi.mock('class-transformer', async () => {
  const actual = await import('class-transformer');

  return {
    ...actual,
    Expose: vi.fn().mockReturnValue(() => ({})),
  };
});
describe('\nPropString', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('\n should apply Expose, IsString, IsOptional decorator for property with not options', () => {
    class Sample {
      @PropValidation() value: string;
    }
    new Sample();

    expect(Expose).toHaveBeenCalledExactlyOnceWith({});
    expect(IsString).toHaveBeenCalledExactlyOnceWith({});
    expect(IsOptional).toHaveBeenCalledExactlyOnceWith({});

    expect(IsDefined).not.toHaveBeenCalled();
    expect(MinLength).not.toHaveBeenCalled();
    expect(MaxLength).not.toHaveBeenCalled();
  });

  it('\n should should apply Expose, IsString, IsDefined decorator for property with required option', () => {
    class Sample {
      @PropValidation({ required: true }) value: string;
    }
    new Sample();

    expect(Expose).toHaveBeenCalledExactlyOnceWith({});
    expect(IsString).toHaveBeenCalledExactlyOnceWith({});
    expect(IsDefined).toHaveBeenCalledExactlyOnceWith({});

    expect(IsOptional).not.toHaveBeenCalled();
    expect(MinLength).not.toHaveBeenCalled();
    expect(MaxLength).not.toHaveBeenCalled();
  });

  it('\n should should apply MinLength and MaxLength decorators for property with minLength and maxLength option option', () => {
    class Sample {
      @PropValidation({ minLength: 3, maxLength: 4 }) value: string;
    }
    new Sample();

    expect(MinLength).toHaveBeenCalledExactlyOnceWith(3, {});
    expect(MaxLength).toHaveBeenCalledExactlyOnceWith(4, {});
  });

  it('\n should should apply IsEmail and IsUuid decorator for property with minLength and maxLength option option', () => {
    class Sample {
      @PropValidation({ format: 'email' }) email: string;
      @PropValidation({ format: 'password' }) password: string;
      @PropValidation({ format: 'uuid4' }) uuid4: string;
      @PropValidation({ format: 'uuid7' }) uuid7: string;
    }
    new Sample();

    expect(IsEmail).toHaveBeenCalledExactlyOnceWith({}, {});
    expect(IsUUID).toHaveBeenCalledWith('4', {});
    expect(IsUUID).toHaveBeenCalledWith('7', {});
    expect(IsStrongPassword).toHaveBeenCalledOnce();
  });
});
