type Store<T> = Readonly<{
  setState(state: T): void;
  getState(): Readonly<T>;
}>

const createStore = <T>(initialState: T): Store<T> => {
  let state = initialState

  return {
    setState(newState) {
      state = newState
    },
    getState() {
      return state
    }
  }
}
