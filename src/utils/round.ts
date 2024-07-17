export function round(value: number, decimalPlaces = 2) {
  return ((value + Number.EPSILON) * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}
