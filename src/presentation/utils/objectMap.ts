export default function objectMap(object: any, mapFn: any) {
  return Object.keys(object).reduce(function (result: any, key) {
    result[key] = mapFn(object[key], key);
    return result;
  }, {});
}
