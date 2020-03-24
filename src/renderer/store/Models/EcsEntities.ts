import { observable } from 'mobx'
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

  public createEntity(id: number, generation: number) {
    const entity = new EcsEntity(id, generation)
    this.items.set(id, entity)

    return entity
  }

  public removeEntity(id: number) {
    this.items.delete(id)
  }

  public getEntity(id: number) {
    return Maybe.of(this.items.get(id))
  }
}
