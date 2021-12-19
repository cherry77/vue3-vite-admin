const toString = Object.prototype.toString;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}

export function isObject(val: unknown): val is string {
  return is(val, 'Object');
}

export function isFunction(val: unknown): val is string {
  return is(val, 'Function');
}

