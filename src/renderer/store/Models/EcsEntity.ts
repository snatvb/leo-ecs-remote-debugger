import { observable } from 'mobx'
import * as R from 'ramda'
import { EcsComponent } from './EcsComponent'

export class EcsEntity {
  @observable
  public components: EcsComponent[]
  public id: number

  constructor(id: number) {
    this.id = id
    // tslint:disable-next-line:insecure-random
    this.components = R.compose(
      R.map((x) => new EcsComponent(x.toString())),
      R.range(0),
    )(Math.round(Math.random() * 12))
  }
}
