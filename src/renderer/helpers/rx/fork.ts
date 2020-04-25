import { interval } from 'rxjs'

export type Options = Readonly<{
  period: number
}>

export interface IFork {
  stop(): void
  recreate(newOptions?: Options): void
  run(newOptions?: Options): void
}

export interface IStartedFork {
  stop(): void
}

export type Create = (callback: () => void, defaultOptions: Options) => IFork
export type StartFork = (callback: () => void, options: Options) => IStartedFork

const startFork: StartFork = (callback, options) => {
  const intervalRequesting = interval(options.period)
      .subscribe(callback)

  return {
      stop() {
        intervalRequesting.unsubscribe()
      }
    }
}

export const createFork: Create = (callback, options) => {
  let fork: IStartedFork | null = null

  const stop = () => {
    if (fork) {
      fork.stop()
      fork = null
    }
  }

  const recreate = (newOptions: Options | undefined = options) => {
    stop()
    fork = startFork(callback, newOptions)
  }

  return {
    stop,
    recreate,
    run: recreate,
  }
}
