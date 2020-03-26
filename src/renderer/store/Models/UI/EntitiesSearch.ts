import { computed, observable } from 'mobx'
import { Maybe } from 'monad-maniac'

type Queries = Map<number, string>

export class EntitiesSearch {
  @observable
  private queries: Queries = new Map()

  public getQuery(worldId: number) {
    return computed(() => Maybe.of(this.queries.get(worldId))).get()
  }

  public setQuery(worldId: number, query: string) {
    this.queries.set(worldId, query)
  }
}
