export enum RemoteCommandType {
  HeartBeat,
  EntityCreated,
  EntityDestroyed,
  EntityChanged,
  EntityDataRequest,
  EntityDataResponse,
}

export type BaseRemoteCommandRaw = {
  t: number
  i: number
  g: number
}

export type RemoteCommandRawResponse = BaseRemoteCommandRaw & {
  t: RemoteCommandType.EntityDataResponse
  c?: string[]
}

export type RemoteCommandRaw = (
  BaseRemoteCommandRaw |
  RemoteCommandRawResponse
)

export interface IRemoteCommand {
  getCommandType(): RemoteCommandType
  getEntityId(): number
  getEntityGeneration(): number
}
