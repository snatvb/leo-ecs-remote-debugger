import { Maybe } from 'monad-maniac'

export const getElementById = (id: string) => Maybe.of(document.getElementById(id))
