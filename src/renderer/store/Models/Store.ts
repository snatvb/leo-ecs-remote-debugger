import { action, observable } from 'mobx'
import { Maybe } from 'monad-maniac'
import { Commands } from './Commands'
import { EcsWorld } from './EcsWorld'
import { UI } from './UI/UI'

export type EcsWorlds = Map<number, EcsWorld>

export class Store {
  public commands: Commands
  @observable
  public worlds: EcsWorlds = new Map()
  public ui: UI

  constructor() {
    this.commands = new Commands(this)
    this.ui = new UI(this)
  }

  @action.bound
  public createWorld(id: number): EcsWorld {
    const world = new EcsWorld(this, id)
    this.worlds.set(id, world)

    return world
  }

  @action.bound
  public removeWorld(id: number): void {
    this.worlds.delete(id)
  }

  public getWorld(id: number): Maybe.MaybeShape<EcsWorld> {
    return Maybe.of(this.worlds.get(id))
  }
}
