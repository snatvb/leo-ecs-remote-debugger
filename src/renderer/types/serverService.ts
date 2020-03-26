import { IRemoteCommand } from '@commonTypes/commands'
import { ConnectionEventType } from '@renderer/transport'

export type CommandHandler = (id: number, command: IRemoteCommand) => void
export type ConnectionHandler = (id: number, type: ConnectionEventType) => void

export interface IServerService {
  on(eventName: 'command', handler: CommandHandler): void
  on(eventName: ConnectionEventType, handler: ConnectionHandler): void
  off(eventName: 'command', handler: CommandHandler): void
  off(eventName: ConnectionEventType, handler: ConnectionHandler): void
  sendCommand(clientId: number, cmd: IRemoteCommand): void
}
