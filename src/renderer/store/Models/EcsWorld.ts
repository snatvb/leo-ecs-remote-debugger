import { action, observable } from 'mobx'
import { EcsEntities } from './EcsEntities'
import { Store } from './Store'

export class EcsWorld {
  @observable
  public id: number
  @observable
  public isAlive: boolean = true
  @observable
  public entities: EcsEntities
  public store: Store

  constructor(store: Store, id: number) {
    this.store = store
    this.id = id
    this.entities = new EcsEntities(store)
  }

  @action.bound
  public createEntity(entityId: number) {
    return this.entities.createEntity(entityId)
  }

  @action.bound
  public removeEntity(entityId: number) {
    this.entities.removeEntity(entityId)
  }

  @action.bound
  public getEntity(id: number) {
    return this.entities.getEntity(id)
  }
}
