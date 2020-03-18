import { RemoteCommand } from '@/commonTypes/api'
import { observable } from 'mobx'
import { Store } from './Store'

export class Commands {
  @observable
  public list: RemoteCommand[] = []
  private store: Store

  constructor(store: Store) {
    this.store = store
  }
}
