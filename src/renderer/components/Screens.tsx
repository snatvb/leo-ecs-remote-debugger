import { Screen, screenContext } from '@context/screen'
import * as React from 'react'
import { Worlds } from './Worlds'
import { WorldsScreen } from './WorldsScreen'

const Screens = React.memo(() => {
  const screen = React.useContext(screenContext)
  switch (screen.current) {
    case Screen.Main:
      return <Worlds />
    case Screen.Worlds:
      return <WorldsScreen />
    default:
      return null
  }
})

export { Screens }
