import * as periodicRequest from './periodic-request'
import { IApi } from './types'
import * as worldAutoRemove from './worldAutoRemove'

export const initialize = (api: IApi) => {
  periodicRequest.initialize(api)
  worldAutoRemove.initialize()
}
