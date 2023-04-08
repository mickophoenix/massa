export function toDate(val: Date | string): Date {
  return new Date(val);
}

export function dateToNumber(val: Date | string): number {
  return toDate(val).getTime();
}
