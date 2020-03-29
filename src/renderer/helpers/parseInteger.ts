import { Maybe } from 'monad-maniac'

export const parseInteger = (value: string) => (
  Maybe
    .of(parseInt(value, 10))
    .filter((n: number) => !Number.isNaN(n))
)
