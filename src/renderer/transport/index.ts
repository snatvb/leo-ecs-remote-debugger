import { IRemoteCommand } from '@commonTypes/commands'
import { IServerService } from '@renderer/types/serverService'
import * as commandsHandler from './commandsHandler'
import * as connectionHandler from './connectionHandler'
import * as ipc from './ipc'

export enum ConnectionEventType {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

export type TransportAPI = {
  sendCommand(clientId: number, cmd: IRemoteCommand): void
}

export const initialize = (): TransportAPI => {
  const serverService: IServerService = ipc.initialize()
  connectionHandler.initialize(serverService)
  commandsHandler.initialize(serverService)

  return {
    sendCommand: serverService.sendCommand,
  }
}
