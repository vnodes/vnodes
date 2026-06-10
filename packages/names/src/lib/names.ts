import type { Names } from '@vnodes/types';

export function upperCaseFirst(text: string) {
  return text[0].toUpperCase() + text.slice(1);
}

export function lowerCaseFirst(text: string) {
  return text[0].toLowerCase() + text.slice(1);
}

export function toKebabCase(name: string) {
  return name
    .replace(/\s{2,}/g, ' ')
    .trim()
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s\-_]{1,}/g, '-')
    .toLowerCase();
}

export function toPascalCase(kebabCase: string) {
  return kebabCase.split('-').map(upperCaseFirst).join('');
}

export function toCamelCase(kebabCase: string) {
  return lowerCaseFirst(kebabCase.split('-').map(upperCaseFirst).join(''));
}
export function toSnakeCase(kebabCase: string) {
  return kebabCase.replace(/-/g, '_');
}

export function toSentenceCase(kebabCase: string) {
  return upperCaseFirst(kebabCase.replace(/-/g, ' '));
}

export function toTitleCase(kebabCase: string) {
  return kebabCase.split('-').map(upperCaseFirst).join(' ');
}

export function names(name: string): Names {
  const kebab = toKebabCase(name);

  const pascal = toPascalCase(kebab);
  const camel = toCamelCase(kebab);
  const snake = toSnakeCase(kebab);
  const constant = snake.toUpperCase();
  const sentence = toSentenceCase(kebab);
  const title = toTitleCase(kebab);

  return {
    kebab,
    pascal,
    camel,
    snake,
    constant,
    sentence,
    title,
  };
}
