import { action, observable } from 'mobx'
import { Maybe } from 'monad-maniac'
import { EcsEntity } from './EcsEntity'
import { Store } from './Store'

export type EcsEntityItems = Map<number, EcsEntity>

export class EcsEntities {
  @observable
  public items: EcsEntityItems = new Map()
  private store: Store

  constructor(store: Store) {
    this.store = store
  }

  @action.bound
  public createEntity(id: number) {
    const entity = new EcsEntity(id)
    this.items.set(id, entity)

    return entity
  }

  @action.bound
  public removeEntity(id: number) {
    this.items.delete(id)
  }

  @action.bound
  public getEntity(id: number) {
    return Maybe.of(this.items.get(id))
  }
}
