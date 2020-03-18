import { RemoteCommand } from '@/commonTypes/api'
import { ipcRenderer } from 'electron'
import { EventEmitter } from 'events'
import { Either } from 'monad-maniac'
import { CommandHandler, ConnectionEventType, ConnectionHandler, IServerService } from '../data-worker'

const handleConnection = (emitter: EventEmitter) => {
  ipcRenderer.on('socket-connected', (_: any, id: number) => {
    emitter.emit('connected', id)
  })
}

const handleDisconnected = (emitter: EventEmitter) => {
  ipcRenderer.on('socket-disconnected', (_: any, id: number) => {
    emitter.emit('disconnected', id)
  })
}

const handleMessage = (emitter: EventEmitter) => {
  ipcRenderer.on('socket-message', (_: any, clientId: number, data: string) => {
    Either
      .attempt(() => JSON.parse(data) as RemoteCommand, [])
      .caseOf({
        Left: (error) => {
          console.error('Catch error by receive from socket', error)
        },
        Right: (message) => {
          emitter.emit('command', clientId, message)
        }
      })
  })
}

export const initialize = (): IServerService => {
  const emitter = new EventEmitter()
  handleDisconnected(emitter)
  handleConnection(emitter)
  handleMessage(emitter)

  const addAndRemoveListener = (
    type: 'on' | 'off',
    eventName: 'command' | ConnectionEventType,
    cb: CommandHandler | ConnectionHandler
  ) => {
    switch (eventName) {
      case 'command':
      case ConnectionEventType.Connected:
      case ConnectionEventType.Disconnected:
        type === 'on' ? emitter.on(eventName, cb) : emitter.off(eventName, cb)
        break

      default:
        console.warn(`This is unknown event name`, eventName)
    }
  }

  return {
    on(eventName: 'command' | ConnectionEventType, cb: CommandHandler | ConnectionHandler) {
      addAndRemoveListener('on', eventName, cb)
    },
    off(eventName: 'command' | ConnectionEventType, cb: CommandHandler | ConnectionHandler) {
      addAndRemoveListener('off', eventName, cb)
    },
  }
}
