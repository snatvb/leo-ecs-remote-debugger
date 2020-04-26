import { computed, observable, reaction } from 'mobx'
import { Maybe } from 'monad-maniac'
import { Nullable } from 'monad-maniac/types'
import { Store } from '../Store'
import { ElectronSettings } from './ElectronSettings'
import { EntitiesSearch } from './EntitiesSearch'
import { Modals } from './Modals/Modals'
import { RequestPeriod } from './RequestPeriod'
import { ScreenStore } from './ScreenStore'

export class UI {
  @observable
  public isOpenSecond: boolean = false
  @observable
  public entitiesSearch: EntitiesSearch
  @observable
  public modals: Modals

  public requestPeriod: RequestPeriod
  public screen: ScreenStore
  public electronSettings: ElectronSettings

  @observable
  private openedWorlds: [Nullable<number>, Nullable<number>] = [undefined, undefined]
  @observable
  private store: Store

  constructor(store: Store) {
    this.store = store
    this.requestPeriod = new RequestPeriod(store)
    this.entitiesSearch = new EntitiesSearch()
    this.modals = new Modals()
    this.screen = new ScreenStore()
    this.electronSettings = new ElectronSettings()

    this.initialize()
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

  @computed
  public get anyWorldIsOpen() {
    return typeof this.openedWorlds[0] === 'number' || typeof this.openedWorlds[1] === 'number'
  }

  public worldIsOpen(id: number) {
    return this.openedWorlds[0] === id || this.openedWorlds[1] === id
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

  private initialize() {
    const store = this.store

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
}
