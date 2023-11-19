import { ZodEnum, z } from 'zod';

interface EnumValue {
  apiValue: string;
  displayValue: string;
}

/**
 * `extractValuesAsTuple` extracts the values from a given enum-like object and returns them
 * in a tuple format.
 *
 * This helper is useful when working with libraries or utilities that expect a non-empty tuple
 * of string values, particularly when those utilities cannot accept a simple string array.
 *
 * @template T - The type of the enum-like object. It should be a record of string keys to string values.
 *
 * @param {T} obj - The enum-like object from which values should be extracted.
 *
 * @returns {[string, ...string[]]} - A tuple containing all the values from the given object.
 * The tuple is guaranteed to have at least one value.
 *
 * @example
 * const Colors = { RED: 'Red', GREEN: 'Green', BLUE: 'Blue' } as const;
 * const colorValues = extractValuesAsTuple(Colors); // ['Red', 'Green', 'Blue']
 *
 * @throws {Error} - Throws an error if the provided object is empty.
 *
 * @author Ruslan Gonzalez
 */
const extractValuesAsTuple = <T extends Record<string, any>>(obj: T): [string, ...string[]] => {
  const values = Object.values(obj) as T[keyof T][];

  if (values.length === 0) {
    throw new Error('Object must have at least one value.');
  }

  return [values[0], ...values.slice(1)];
};

const createEnumSchema = <T extends Record<string, EnumValue>>(enumLike: T): ZodEnum<[string, ...string[]]> => {
  return z.enum(extractValuesAsTuple(Object.values(enumLike).map((v) => v.apiValue)));
};

const getEnumValue = <T extends Record<string, EnumValue>>(value: string, enumLike: T): EnumValue => {
  return enumLike[value.toLocaleUpperCase()];
};

export { createEnumSchema, getEnumValue, type EnumValue };
