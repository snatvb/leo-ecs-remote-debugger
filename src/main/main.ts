/**
 * Entry point of the Election app.
 */
import { app, BrowserWindow, ipcMain } from 'electron'
import * as path from 'path'
import * as url from 'url'
import * as appSettings from './app-settings'
import * as ws from './ws'

let mainWindow: Electron.BrowserWindow | null
async function createWindow() {
  const settings = await appSettings.load()
  // Create the browser window.
  mainWindow = new BrowserWindow({
    height: 768,
    width: 1366,
    minHeight: 480,
    minWidth: 640,
    webPreferences: {
      webSecurity: false,
      devTools: process.env.NODE_ENV === 'production' ? false : true
    },
    frame: false,
    transparent: true,
    resizable: true,
    center: true,
  })

  appSettings.registerListeners(mainWindow)
  const closeSocket = ws.create(mainWindow, settings)

  // and load the index.html of the app.
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, './index.html'),
      protocol: 'file:',
      slashes: true
    })
  )

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    closeSocket()
    mainWindow = null
  })
}

ipcMain.on('app-close', () => {
  app.quit()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', async () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    await createWindow()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
