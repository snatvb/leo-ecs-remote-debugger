import { computed, observable } from 'mobx'
import { EcsEntities } from './EcsEntities'
import { Store } from './Store'

export enum WorldStatus {
  Pause = 'pause',
  Alive = 'alive',
  Died = 'died',
}

export class EcsWorld {
  @observable
  public id: number
  @observable
  public status: WorldStatus = WorldStatus.Alive
  @observable
  public entities: EcsEntities
  public store: Store

  constructor(store: Store, id: number) {
    this.store = store
    this.id = id
    this.entities = new EcsEntities(store)
  }

  @computed
  get isPaused() {
    return this.status === WorldStatus.Pause
  }

  @computed
  get isDied() {
    return this.status === WorldStatus.Died
  }

  @computed
  get isAlive() {
    return this.status === WorldStatus.Alive
  }

  set isAlive(newValue: boolean) {
    this.status = newValue === true ? WorldStatus.Alive : WorldStatus.Died
  }

  public pause() {
    if (!this.isDied) {
      this.status = WorldStatus.Pause
    }
  }

  public resume() {
    if (this.isPaused) {
      this.status = WorldStatus.Alive
    } else {
      console.warn(`Can't resume world ${this.id} because it have status: ${this.status}`)
    }
  }

  public createEntity(entityId: number, generation: number) {
    return this.entities.createEntity(entityId, generation)
  }

  public removeEntity(entityId: number) {
    this.entities.removeEntity(entityId)
  }

  public getEntity(id: number) {
    return this.entities.getEntity(id)
  }
}
