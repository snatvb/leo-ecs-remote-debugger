import { Settings } from '@main/app-settings'
import { action, observable } from 'mobx'

export enum State {
  Idle = 'Idle',
  Loading = 'Loading',
  Ready = 'Ready',
  Saving = 'Saving',
  Error = 'Error',
}

export class ElectronSettings {
  @observable
  public state: State = State.Idle
  @observable
  public settings: Settings

  @action
  public save(newSettings: Settings) {
    this.settings = newSettings
    this.state = State.Saving
  }

  @action
  public update(newSettings: Settings) {
    this.settings = newSettings
    this.state = State.Ready
  }
}
