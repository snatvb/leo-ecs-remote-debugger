import * as React from 'react'
import { store } from '.'
import { Store } from './Models/Store'

const StoreContext = React.createContext({ store })

export const useStore = (): Store => {
  // tslint:disable-next-line:no-shadowed-variable
  const { store } = React.useContext(StoreContext)
  if (!store) {
    throw new Error('Probably store is not initialized')
  }

  return store
}
