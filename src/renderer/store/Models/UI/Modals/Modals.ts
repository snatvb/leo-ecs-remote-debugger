import { observable } from 'mobx'
import { EntityModal } from './EntityModal'

export class Modals {
  @observable
  public entityModal: EntityModal

  constructor() {
    this.entityModal = new EntityModal()
  }
}
