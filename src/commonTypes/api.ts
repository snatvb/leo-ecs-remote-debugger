
export enum RemoteCommandType {
  EntityCreated,
  EntityRemoved,
  EntityChanged,
  RequestEntityData,
}

export type RemoteCommand = Readonly<{
  cmd: RemoteCommandType
  int1?: number
  int2?: number
  str1?: string
}>
