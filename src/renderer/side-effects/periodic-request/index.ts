import { IApi } from '../types'
import * as world from './world'

export const initialize = (api: IApi) => {
  world.initialize(api)
}
