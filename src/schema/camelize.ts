import camelcaseKeys from 'camelcase-keys';

const camelize = <T extends Record<string, unknown> | ReadonlyArray<Record<string, unknown>>>(val: T) =>
  camelcaseKeys(val);

export default camelize;
