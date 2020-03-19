import * as React from 'react'

export enum Screen {
  Main,
  Worlds,
  Tabs,
}

export type ScreenContext = {
  current: Screen
  change(screen: Screen): void;
}

export const screenContext = React.createContext<ScreenContext>({
  current: Screen.Main,
  // This method will be override in parent component
  // tslint:disable-next-line:no-empty
  change: () => {},
})

type Props = React.PropsWithChildren<{}>

const ScreenContextProvider = screenContext.Provider

export const Provider = ({ children }: Props) => {
  const [screenState, setScreenState] = React.useState(Screen.Main)

  const change = React.useCallback((screen: Screen) => {
    setScreenState(screen)
  }, [])

  const context: ScreenContext = React.useMemo(() => ({
    change,
    current: screenState,
  }), [screenState])

  return (
    <ScreenContextProvider value={context}>
      {children}
    </ScreenContextProvider>
  )
}
