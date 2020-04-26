import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import { readJsonFile } from './fs/readJsonFile'
import { writeFile } from './fs/writeFile'

const FILE_NAME = 'app-settings.json'
const USER_DATA_PATH = app.getPath('userData')
const FILE_PATH = path.join(USER_DATA_PATH, FILE_NAME)

export type Settings = Readonly<{
  ws: {
    port: number
  }
}>

const defaultSettings: Settings = {
  ws: {
    port:  1111,
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
  if (process.env.NODE_ENV === 'development') {
    console.log(`Loading settings from ${FILE_PATH}`)
  }

  if (cache) {
    return cache
  }

  const json = await readJsonFile(FILE_PATH)
  cache = json.filter(validate).getOrElse(defaultSettings) as Settings

  return cache
}

export const save = async (settings: Settings) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`Saving settings from ${FILE_PATH}`)
  }

  cache = settings

  return (await writeFile(FILE_PATH, JSON.stringify(settings))).isRight()
}

export const registerListeners = (window: BrowserWindow) => {
  ipcMain.on('settings-save', (_: any, settings: Settings) => {
    // tslint:disable-next-line: no-floating-promises
    save(settings)
  })

  ipcMain.on('settings-update', async (_: any) => {
    const settings = await load()
    window.webContents.send('settings-updated', settings)
  })
}
