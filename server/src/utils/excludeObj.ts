function excludeKey<T extends Record<string, any>>(
  obj: T,
  keyToExclude: keyof T
): Partial<T> {
  const newObj: Partial<T> = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && key !== keyToExclude) {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}
export default excludeKey;
