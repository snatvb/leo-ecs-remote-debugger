import { IRemoteCommand } from '@/commonTypes/commands'
import { observable } from 'mobx'
import { Store } from './Store'

export class Commands {
  @observable
  public list: IRemoteCommand[] = []
  private store: Store

  constructor(store: Store) {
    this.store = store
  }
}
