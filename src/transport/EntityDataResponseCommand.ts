import { IRemoteCommand, RemoteCommandType } from '@commonTypes/commands'
import { Components } from '@commonTypes/ecs'

export class EntityDataResponseCommand implements IRemoteCommand {
  private id: number
  private generation: number
  private components: Components

  constructor(id: number, generation: number, components: string[] = []) {
      this.id = id
      this.generation = generation
      this.components = []
      if (components.length > 0) {
          for (let i = 0; i < components.length; i += 2) {
              this.components.push({
                name: components[i],
                data: components[i + 1],
              })
          }
      }
  }

  public getCommandType() {
    return RemoteCommandType.EntityDataResponse
  }

  public getEntityId(): number {
    return this.id
  }

  public getEntityGeneration(): number {
    return this.generation
  }

  public getComponents(): Components {
    return this.components
  }
}
