import { IRemoteCommand } from '@commonTypes/commands'

export interface IApi {
  sendCommand(clientId: number, cmd: IRemoteCommand): void
}
