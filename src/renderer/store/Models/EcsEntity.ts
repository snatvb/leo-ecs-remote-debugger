import { observable } from 'mobx'
import { EcsComponent } from './EcsComponent'

export class EcsEntity {
  @observable
  public components: EcsComponent[]
  public id: number

  constructor(id: number) {
    this.id = id
  }
}
