// Own-key lookup: keys like "constructor" or "toString" must not hit Object.prototype.
// (Object.hasOwn is ES2022; tsconfig.app.json targets ES2020, so use hasOwnProperty.call.)
export function lookup<V>(map: Record<string, V>, key: string): V | undefined {
  return Object.prototype.hasOwnProperty.call(map, key) ? map[key] : undefined;
}
