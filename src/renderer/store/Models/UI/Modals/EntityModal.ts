import { action, computed, observable } from 'mobx'
import { Maybe } from 'monad-maniac'
import { Nullable } from 'monad-maniac/types'

export type EntityModalValue = Readonly<{
  entityId: number
  worldId: number
}>

export class EntityModal {
  @observable
  private _entityValue: Nullable<EntityModalValue>

  @action
  public open(entityId: number, worldId: number) {
    this._entityValue = { entityId, worldId }
  }

  @action
  public close() {
    this._entityValue = undefined
  }

  @computed
  get entityValue() {
    return Maybe.of(this._entityValue)
  }
}
