import { CmdEcsComponent } from '@commonTypes/ecs'
import { observable } from 'mobx'
import { Maybe } from 'monad-maniac'
import { EcsComponent } from './EcsComponent'

export type EcsComponents = Map<string, EcsComponent>

export class EcsEntity {
  @observable
  public loaded: boolean = false
  @observable
  public components: EcsComponents = new Map()
  public id: number
  @observable
  public generation: number

  constructor(id: number, generation: number) {
    this.id = id
    this.generation = generation
  }

  public getComponent(name: string) {
    return Maybe.of(this.components.get(name))
  }

  public setComponent(name: string, data: string) {
    const component = new EcsComponent(name, data)
    this.components.set(component.name, component)

    return component
  }

  public setLoadedComponents(components: CmdEcsComponent[]) {
    for (const component of components) {
      this.getComponent(component.name).caseOf({
        Just: (existComponent) => { existComponent.setData(component.data) },
        Nothing: () => { this.setComponent(component.name, component.data) },
      })
    }
    this.loaded = true
  }
}
