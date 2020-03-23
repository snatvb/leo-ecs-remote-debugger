import { IRemoteCommand, RemoteCommandType } from '@commonTypes/commands'

export class EntityChangedCommand implements IRemoteCommand {
  private id: number
  private generation: number

  constructor(id: number, generation: number) {
      this.id = id
      this.generation = generation
  }

  public getCommandType() {
    return RemoteCommandType.EntityChanged
  }

  public getEntityId(): number {
    return this.id
  }

  public getEntityGeneration(): number {
    return this.generation
  }

}
