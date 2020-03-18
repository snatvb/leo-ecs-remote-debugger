import { computed, observable } from 'mobx'
import { Maybe } from 'monad-maniac'
import { Store } from '../Store'

export class UI {
  @observable
  private openedWorlds: number[] = []
  private store: Store

  constructor(store: Store) {
    this.store = store
  }

  @computed
  public get firstWorld() {
    return Maybe.of(this.openedWorlds[0])
  }

  public setFirstWorld(value: number) {
    this.openedWorlds[0] = value
  }

  @computed
  public get secondWorld() {
    return Maybe.of(this.openedWorlds[1])
  }

  public setSecondWorld(value: number) {
    this.openedWorlds[1] = value
  }
}
