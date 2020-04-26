import { BrowserWindow, ipcMain } from 'electron'
import { Either } from 'monad-maniac'
import * as WS from 'ws'
import { Settings } from './app-settings'

export type MessageHandler = (clientId: number, message: string) => any
export type DisconnectedHandler = (clientId: number) => any
export type ConnectedHandler = (clientId: number) => any

export type Clients = Map<number, WS>

const createIdCounter = () => {
  let id: number = 0

  return () => id++
}

/*
Maybe will need in future

const findIdByWS = (clients: Clients, clientToFind: WS) => {
  for (const [id, client] of clients.entries()) {
    if (client === clientToFind) {
      return id
    }
  }

  return -1
}
*/

const getClient = (clients: Clients, id: number): Either.Shape<Error, WS> => {
  const client = clients.get(id)

  return client ? Either.right(client) : Either.left(new Error(`Client ${id} not found`))
}

export const create = (window: BrowserWindow, settings: Settings) => {
  const getId = createIdCounter()
  const wss = new WS.Server({ port: settings.ws.port })
  const clients: Clients = new Map()

  wss.addListener('connection', (client) => {
    const id = getId()
    clients.set(id, client)

    client.on('close', () => {
      clients.delete(id)
      window.webContents.send('socket-disconnected', id)
    })

    client.on('message', (data: string) => {
      window.webContents.send('socket-message', id, data)
    })

    window.webContents.send('socket-connected', id)
  })

  ipcMain.on('socket-send-message', (_: any, clientId: number, data: string) => {
    getClient(clients, clientId).caseOf({
      Right: (client) => {
        client.send(data)
      },
      Left: (error) => {
        console.error(error)
      }
    })
  })

  return () => {
    wss.close()
  }
}
