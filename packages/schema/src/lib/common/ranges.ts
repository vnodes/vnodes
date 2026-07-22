// A reusable structural brand layout
export type BoundedNumber<Brand extends string> = number & { readonly __brand: Brand };

/**
 * Creates a reusable validation factory for bounded domain values
 */
export function createNumericDomain<T extends BoundedNumber<string>>(
  min: number,
  max: number,
  name: string,
) {
  return (value: number): T => {
    if (value < min || value > max) {
      throw new Error(`[${name}] Validation Error: ${value} must be between ${min} and ${max}.`);
    }
    return value as unknown as T;
  };
}

export type Rating5 = BoundedNumber<'rating5'>;
export const toRating5 = createNumericDomain<Rating5>(0, 5, 'rating5');

export type Rating10 = BoundedNumber<'rating10'>;
export const toRating10 = createNumericDomain<Rating10>(0, 10, 'rating10');

export type Percentage = BoundedNumber<'percentage'>;
export const toPercentage = createNumericDomain<Percentage>(0, 100, 'percentage');

export type Fraction = BoundedNumber<'fraction'>;
export const toFraction = createNumericDomain<Fraction>(0, 1, 'fraction');

export type Positive = BoundedNumber<'positive'>;
export const toPositive = createNumericDomain<Positive>(0, Number.MAX_SAFE_INTEGER, 'positive');
