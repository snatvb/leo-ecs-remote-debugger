import { IRemoteCommand, RemoteCommandType } from '@commonTypes/commands'

export class EntityCreatedCommand implements IRemoteCommand {
  private id: number
  private generation: number

  constructor(id: number, generation: number) {
      this.id = id
      this.generation = generation
  }

  public getCommandType() {
    return RemoteCommandType.EntityCreated
  }

  public getEntityId() {
    return this.id
  }

  public getEntityGeneration() {
    return this.generation
  }

}
