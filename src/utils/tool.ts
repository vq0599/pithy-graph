export function unique<T>(array: T[], compare = (a: any, b: any) => a === b) {
  const result: T[] = [];
  for (let i = 0, len = array.length; i < len; i++) {
    const current = array[i];
    if (result.findIndex((v) => compare(v, current)) === -1) {
      result.push(current);
    }
  }
  return result;
}
