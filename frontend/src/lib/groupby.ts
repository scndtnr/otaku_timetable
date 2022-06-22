// [JavaScript/TypeScript で配列の groupBy - Qiita](https://qiita.com/nagtkk/items/e1cc3f929b61b1882bd1)

export const groupBy = <K extends PropertyKey, V>(
  array: readonly V[],
  getKey: (current: V, index: number, src: readonly V[]) => K
) =>
  array.reduce((accum, current, index, src) => {
    const key = getKey(current, index, src);
    (accum[key] || (accum[key] = []))!.push(current);
    return accum;
  }, {} as Partial<Record<K, V[]>>);
