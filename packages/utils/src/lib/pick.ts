export function pick<T extends object, K extends keyof T>(
  value: T,
  ...propertyNames: K[]
): Pick<T, K> {
  return propertyNames.reduce(
    (acc, key) => {
      acc[key] = value[key];
      return acc;
    },
    {} as Partial<Pick<T, K>>,
  ) as Pick<T, K>;
}
