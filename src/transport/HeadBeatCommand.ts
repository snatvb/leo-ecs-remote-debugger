import { IRemoteCommand, RemoteCommandType } from '@commonTypes/commands'

export class HeartBeatCommand implements IRemoteCommand {
  public getCommandType() { return RemoteCommandType.HeartBeat }
  public getEntityId() { return 0 }
  public getEntityGeneration() { return 0 }
}
