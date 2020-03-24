import { observable } from 'mobx'

export class EcsComponent {
  public name: string
  @observable
  public data: string

  constructor(name: string, data: string) {
    this.name = name
    this.data = data
  }

  public setData(data: string) {
    this.data = data
  }
}
