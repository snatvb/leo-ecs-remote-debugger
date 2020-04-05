
export interface ITimeout {
  stop(): void
}

export const createTimeoutHandler = (cb: () => any, time: number) => {
  const timeoutId = setTimeout(cb, time)

  return {
    stop: () => { clearInterval(timeoutId) }
  }
}
