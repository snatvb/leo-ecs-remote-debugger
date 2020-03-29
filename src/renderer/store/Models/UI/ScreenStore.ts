import { observable } from 'mobx'

export enum Screen {
  Main,
  Worlds,
  Tabs,
}

export class ScreenStore {
  @observable
  public current: Screen = Screen.Main

  public change(screen: Screen) {
    this.current = screen
  }
}
