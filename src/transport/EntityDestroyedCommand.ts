import { IRemoteCommand, RemoteCommandType } from '@commonTypes/commands'

export class EntityDestroyedCommand implements IRemoteCommand {
  private id: number
  private generation: number

  constructor(id: number, generation: number) {
      this.id = id
      this.generation = generation
  }

  public getCommandType() {
    return RemoteCommandType.EntityDestroyed
  }

  public getEntityId(): number {
    return this.id
  }

  public getEntityGeneration(): number {
    return this.generation
  }

}
