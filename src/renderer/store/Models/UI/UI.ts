import { computed, observable, reaction } from 'mobx'
import { Maybe } from 'monad-maniac'
import { Nullable } from 'monad-maniac/types'
import { Store } from '../Store'

export class UI {
  @observable
  public isOpenSecond: boolean = false
  @observable
  private openedWorlds: [Nullable<number>, Nullable<number>] = [undefined, undefined]
  private store: Store

  constructor(store: Store) {
    this.store = store

    const handleChangeWorlds = (id: number) => {
      if (store.getWorld(id).isNothing()) {
        this.closeWorld(id)
      }
    }

    reaction(
      () => store.worlds.size,
      () => {
        this.firstWorld.map(handleChangeWorlds)
        this.secondWorld.map(handleChangeWorlds)
      }
    )
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

  public openWorld(value: number) {
    if (this.openedWorlds.includes(value)) {
      console.warn(`You can't add ${value} to open because this world exist`)

      return
    }

    if (this.isOpenSecond && this.firstWorld.isJust()) {
      this.setSecondWorld(value)
      this.isOpenSecond = false
    } else {
      this.setFirstWorld(value)
    }
  }

  public closeWorld(value: number) {
    if (this.openedWorlds[0] === value) {
      this.openedWorlds[0] = undefined
    }
    if (this.openedWorlds[1] === value) {
      this.openedWorlds[1] = undefined
    }
  }
}
