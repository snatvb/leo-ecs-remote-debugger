import { IRemoteCommand } from '@commonTypes/commands'
import { IServerService } from '@renderer/types/serverService'
import { ITransportAPI } from '@renderer/types/TransportAPI'
import { store } from '@store'
import * as commandsHandler from './commandsHandler'
import * as connectionHandler from './connectionHandler'
import * as ipc from './ipc'

export enum ConnectionEventType {
  Connected = 'connected',
  Disconnected = 'disconnected',
}

export enum TransportStatus {
  Running,
  Stopped,
  Paused,
}

type State = Readonly<{
  status: TransportStatus
}>

export type TransportAPI = ITransportAPI<State>

const createApi = (): TransportAPI => {
  const localStore = createStore<State>({
    status: TransportStatus.Running
  })
  const serverService: IServerService = ipc.initialize()

  const checkStatusIs = (status: TransportStatus) => localStore.getState().status === status

  const setNewStatus = (newStatus: TransportStatus) => {
    const state = localStore.getState()
    if (state.status !== newStatus) {
      localStore.setState({
        ...state,
        status: newStatus,
      })
    }
  }

  return {
    getServerService: () => serverService,

    getState: () => localStore.getState(),

    pause: () => {
      setNewStatus(TransportStatus.Paused)
    },

    run: () => {
      setNewStatus(TransportStatus.Running)
    },

    stop: () => {
      setNewStatus(TransportStatus.Stopped)
    },

    sendCommand: (clientId: number, cmd: IRemoteCommand) => {
      const worldIsAlive = (
        store
          .getWorld(clientId)
          .map((world) => world.isAlive)
          .getOrElse(false)
      )
      if (checkStatusIs(TransportStatus.Running) && worldIsAlive) {
        serverService.sendCommand(clientId, cmd)
      }
    },
  }
}

export const initialize = (): TransportAPI => {
  const api = createApi()
  connectionHandler.initialize(api)
  commandsHandler.initialize(api)

  return api
}
