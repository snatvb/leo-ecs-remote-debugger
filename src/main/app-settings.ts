import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { readJsonFile } from './fs/readJsonFile'
import { writeFile } from './fs/writeFile'

const FILE_NAME = 'app-settings.json'

const getFilePath = () => path.join(app.getPath('userData'), FILE_NAME)

export enum EventName {
  Save = 'settings-save',
  Load = 'settings-load',
  Updated = 'settings-updated',
}

export type Settings = Readonly<{
  ws: Readonly<{
    port: number
  }>
}>

const defaultSettings: Settings = {
  ws: {
    port: 1111,
  }
}

const validate = (settings: { [key: string]: any }): boolean => {
  if (!settings.ws) {
    return false
  }

  if (typeof settings !== 'number') {
    return false
  }

  return true
}

let cache: Settings

export const load = async () => {
  const filePath = getFilePath()

  if (process.env.NODE_ENV === 'development') {
    console.log(`Loading settings from ${filePath}`)
  }

  if (cache) {
    return cache
  }

  const json = await readJsonFile(filePath)
  cache = json.filter(validate).getOrElse(defaultSettings) as Settings

  return cache
}

export const save = async (settings: Settings) => {
  const filePath = getFilePath()

  if (process.env.NODE_ENV === 'development') {
    console.log(`Saving settings from ${filePath}`)
  }

  cache = settings

  return (await writeFile(filePath, JSON.stringify(settings))).isRight()
}

export const registerListeners = (window: BrowserWindow) => {
  ipcMain.on(EventName.Save, async (_: any, settings: Settings) => {
    await save(settings)
    window.webContents.send(EventName.Updated, settings)
  })

  ipcMain.on(EventName.Load, async (_: any) => {
    const settings = await load()
    window.webContents.send(EventName.Updated, settings)
  })
}
