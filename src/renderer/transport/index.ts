import { IRemoteCommand } from '@/commonTypes/commands'
import * as commandsHandler from './commandsHandler'
import * as connectionHandler from './connectionHandler'
import * as ipc from './ipc'

export enum ConnectionEventType {
  Connected = 'connected',
  Disconnected = 'disconnected',
}
export type CommandHandler = (id: number, command: IRemoteCommand) => void
export type ConnectionHandler = (id: number, type: ConnectionEventType) => void

export interface IServerService {
  on(eventName: 'command', handler: CommandHandler): void
  on(eventName: ConnectionEventType, handler: ConnectionHandler): void
  off(eventName: 'command', handler: CommandHandler): void
  off(eventName: ConnectionEventType, handler: ConnectionHandler): void
}

export const initialize = () => {
  const serverService: IServerService = ipc.initialize()
  connectionHandler.initialize(serverService)
  commandsHandler.initialize(serverService)
}
