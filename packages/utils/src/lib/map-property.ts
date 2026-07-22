export function mapProperty<T extends object, K extends keyof T>(
  propertyName: K,
): (value: T) => T[K] {
  return (value: T) => value[propertyName];
}
