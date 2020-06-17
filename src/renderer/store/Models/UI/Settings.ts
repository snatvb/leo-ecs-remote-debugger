import { loadByKeyJSON } from '@helpers/localStorage'
import { observable } from 'mobx'
import { serializable, serialize } from 'serializr'

export enum StorageKey {
  UISettings = 'ui-settings',
}

export class Settings {
  @serializable
  @observable
  public displayComponentContent: boolean = false

  constructor() {
    this.loadFromStorage()
  }

  public save() {
    const settings = this.serialize()
    console.log('save', settings)
    localStorage.setItem(StorageKey.UISettings, settings)
  }

  public serialize() {
    return JSON.stringify(serialize(Settings, this))
  }

  private loadFromStorage() {
    const settings = loadByKeyJSON(StorageKey.UISettings)
      .getOrElse(undefined)
    if (typeof settings !== 'undefined') {
      this.displayComponentContent = settings.displayComponentContent === true
    }
  }
}
