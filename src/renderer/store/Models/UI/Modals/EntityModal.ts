import { action, observable } from 'mobx'
import { Maybe } from 'monad-maniac'
import { Nullable } from 'monad-maniac/types'

export type EntityModalValue = Readonly<{
  entityId: number
  worldId: number
}>

export class EntityModal {
  @observable
  private entity: Nullable<EntityModalValue>

  @action
  public open(entityId: number, worldId: number) {
    this.entity = { entityId, worldId }
  }

  @action
  public close() {
    this.entity = undefined
  }

  public getEntityId(): Maybe.Shape<EntityModalValue> {
    return Maybe.of(this.entity)
  }
}
