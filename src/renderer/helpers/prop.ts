
export const prop = <T, K extends keyof T>(key: K) => (obj: T) => obj[key]
