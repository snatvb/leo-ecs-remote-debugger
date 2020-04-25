import { IApi } from '../types'
import * as entity from './entity'
import * as world from './world'

export const initialize = (api: IApi) => {
  world.initialize(api)
  entity.initialize(api)
}
