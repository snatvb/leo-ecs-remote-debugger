import { observable } from 'mobx'
import { Store } from '../Store'

export const DEFAULT_VALUES = Object.freeze({
  OPENED_WORLD: 300,
  OPENED_ENTITY: 60,
})

export class RequestPeriod {
  @observable
  public openedWorld: number = DEFAULT_VALUES.OPENED_WORLD
  @observable
  public openedEntity: number = DEFAULT_VALUES.OPENED_ENTITY

  private store: Store

  constructor(store: Store) {
    this.store = store
  }
}
