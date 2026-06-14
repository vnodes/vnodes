import { ClassSuffixes } from '../constants/class-suffix.js';

/**
 * Trim the system suffixes from the target class name and return the rest as it is. For example, for ResourceController, it returns Resource
 */
export function inferResourceName(className: string) {
  return className.replace(new RegExp(`(${ClassSuffixes.join('|')})$`), '');
}
