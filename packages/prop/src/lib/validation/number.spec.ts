import 'reflect-metadata';
import { PropValidation } from './prop.js';

import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsOptional } from 'class-validator';
import { vi } from 'vitest';

vi.mock('class-validator', async () => {
  const actual = await import('class-validator');

  return {
    ...actual,
    IsOptional: vi.fn().mockReturnValue(() => ({})),
    IsDefined: vi.fn().mockReturnValue(() => ({})),
    IsNumber: vi.fn().mockReturnValue(() => ({})),
    IsInt: vi.fn().mockReturnValue(() => ({})),
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

describe('PropNumber', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('\n should apply Expose, IsNumber, IsOptional decorator for property with not options', () => {
    class Sample {
      @PropValidation() value: number;
    }
    new Sample();

    expect(Expose).toHaveBeenCalledExactlyOnceWith({});
    expect(IsNumber).toHaveBeenCalledExactlyOnceWith({}, {});
    expect(IsOptional).toHaveBeenCalledExactlyOnceWith({});

    expect(IsDefined).not.toHaveBeenCalled();
  });

  it('\n should apply Expose, IsNumber, IsOptional decorator for property with not options', () => {
    class Sample {
      @PropValidation() value: number;
    }
    new Sample();

    expect(Expose).toHaveBeenCalledExactlyOnceWith({});
    expect(IsNumber).toHaveBeenCalledExactlyOnceWith({}, {});
    expect(IsOptional).toHaveBeenCalledExactlyOnceWith({});
    expect(IsOptional).toHaveBeenCalledExactlyOnceWith({});

    expect(IsDefined).not.toHaveBeenCalled();
  });
});
