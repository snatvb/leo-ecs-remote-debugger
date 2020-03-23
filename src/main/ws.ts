import { BrowserWindow } from 'electron'
import * as WS from 'ws'

export type MessageHandler = (clientId: number, message: string) => any
export type DisconnectedHandler = (clientId: number) => any
export type ConnectedHandler = (clientId: number) => any

export type Clients = Map<number, WS>

const createIdCounter = () => {
  let id: number = 0

  return () => id++
}

/*
Will need in future

const findIdByWS = (clients: Clients, clientToFind: WS) => {
  for (const [id, client] of clients.entries()) {
    if (client === clientToFind) {
      return id
    }
  }

  return -1
}
*/

export const create = (window: BrowserWindow) => {
  const getId = createIdCounter()
  const wss = new WS.Server({ port: 1111 })
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

  return () => {
    wss.close()
  }
}
