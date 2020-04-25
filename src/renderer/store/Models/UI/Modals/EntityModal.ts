import { observable } from 'mobx'
import { Maybe } from 'monad-maniac'
import { Nullable } from 'monad-maniac/types'

export class EntityModal {
  @observable
  private entityId: Nullable<number>

  public open(entityId: number) {
    this.entityId = entityId
  }

  public close(entityId: number) {
    this.entityId = entityId
  }

  public getEntityId(): Maybe.Shape<number> {
    return Maybe.of(this.entityId)
  }
}
