import * as periodicRequest from './periodic-request';
import { IApi } from './types';

export const initialize = (api: IApi) => {
  periodicRequest.initialize(api)
}
