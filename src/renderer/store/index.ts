import { Store } from './Models/Store'

export const store = new Store()

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  window.store = store
}
