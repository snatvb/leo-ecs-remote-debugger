export function curry1<T, U>(op: (a: T) => U, a?: T) {
  return a !== undefined ? op(a) : op
}
