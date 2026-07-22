export function omit<T extends object, K extends keyof T>(
  value: T,
  ...propertyNames: K[]
): Omit<T, K> {
  // Create a shallow copy of the object to avoid mutating the original
  const result = { ...value };

  // Delete the unwanted properties
  for (const key of propertyNames) {
    delete result[key];
  }

  // Cast the remaining object to the expected Omit type
  return result as Omit<T, K>;
}
