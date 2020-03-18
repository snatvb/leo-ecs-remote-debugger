import { RemoteCommand } from '@/commonTypes/api'
import * as commandsHandler from './commandsHandler'
import * as connectionHandler from './connectionHandler'

export enum ConnectionEventType {
  Connected = 'connected',
  Disconnected = 'disconnected',
}
export type CommandHandler = (id: number, command: RemoteCommand) => void
export type ConnectionHandler = (id: number, type: ConnectionEventType) => void

export interface IServerService {
  on(eventName: 'command', handler: CommandHandler): void
  on(eventName: ConnectionEventType, handler: ConnectionHandler): void
  off(eventName: 'command', handler: CommandHandler): void
  off(eventName: ConnectionEventType, handler: ConnectionHandler): void
}

export const initialize = (serverService: IServerService) => {
  connectionHandler.initialize(serverService)
  commandsHandler.initialize(serverService)
}
