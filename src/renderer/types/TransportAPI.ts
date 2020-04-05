import { IRemoteCommand } from '@commonTypes/commands'
import { IServerService } from './serverService'

export interface ITransportAPI<T> {
  pause(): void
  stop(): void
  run(): void
  getState(): T
  getServerService(): IServerService
  sendCommand(clientId: number, cmd: IRemoteCommand): void
}
