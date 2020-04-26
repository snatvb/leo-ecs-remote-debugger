import { EventName, Settings } from '@main/app-settings'
import { store } from '@store'
import { State } from '@store/Models/UI/ElectronSettings'
import { ipcRenderer } from 'electron'
import { reaction } from 'mobx'

const handleUpdated = (_: any, settings: Settings) => {
  store.ui.electronSettings.update(settings)
}

const load = (state: State) => {
  if (state === State.Loading) {
    ipcRenderer.send(EventName.Load)
  }
 }

const save = (state: State) => {
  if (state === State.Saving) {
    ipcRenderer.send(EventName.Save, store.ui.electronSettings.settings)
  }
}

const handleChangeState = (state: State) => {
  load(state)
  save(state)
}

export const initialize = () => {
  ipcRenderer.on(EventName.Updated, handleUpdated)

  reaction(() => store.ui.electronSettings.state, handleChangeState)
}
