import { observable } from 'mobx'
import * as R from 'ramda'
import { EcsComponent } from './EcsComponent'

export class EcsEntity {
  @observable
  public loaded: boolean = false
  @observable
  public components: EcsComponent[] = []
  public id: number

  constructor(id: number) {
    this.id = id
    // TODO: Need remove
    // tslint:disable-next-line:insecure-random
    this.components = R.compose(
      R.map((x) => new EcsComponent(x.toString())),
      R.range(0),
    )(Math.round(Math.random() * 12))
  }

  public setLoadedComponents(components: EcsComponent[]) {
    this.components = components
    this.loaded = true
  }
}
