export enum RemoteCommandType {
  EntityCreated,
  EntityDestroyed,
  EntityChanged,
  EntityDataRequest,
  EntityDataResponse,
}

export interface IRemoteCommandRaw {
  t: number
  i: number
  g: number
}

export interface IRemoteCommand {
  getCommandType(): RemoteCommandType
  getEntityId(): number
  getEntityGeneration(): number
}
