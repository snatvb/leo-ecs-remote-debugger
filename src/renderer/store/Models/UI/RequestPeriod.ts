import { loadByKeyNumber } from '@helpers/localStorage'
import { observable, reaction } from 'mobx'
import { Store } from '../Store'

export const DEFAULT_VALUES = Object.freeze({
  OPENED_WORLD: 1000,
  OPENED_ENTITY: 60,
})

enum StorageKeys {
  World = 'requestPeriodWorld',
  Entity = 'requestPeriodEntity',
}

export class RequestPeriod {
  @observable
  public openedWorld: number = DEFAULT_VALUES.OPENED_WORLD
  @observable
  public openedEntity: number = DEFAULT_VALUES.OPENED_ENTITY

  private store: Store

  constructor(store: Store) {
    this.store = store
    this.loadFromStorage()
    this.registerSave()
  }

  private loadFromStorage() {
    this.openedWorld = loadByKeyNumber(StorageKeys.World)
      .getOrElse(DEFAULT_VALUES.OPENED_WORLD)
    this.openedEntity = loadByKeyNumber(StorageKeys.Entity)
      .getOrElse(DEFAULT_VALUES.OPENED_ENTITY)
  }

  private registerSave() {
    reaction(() => this.openedWorld, () => { localStorage.setItem(StorageKeys.World, this.openedWorld.toString()) })
    reaction(() => this.openedEntity, () => { localStorage.setItem(StorageKeys.Entity, this.openedEntity.toString()) })
  }
}
