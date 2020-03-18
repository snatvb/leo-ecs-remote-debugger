import { Screen, screenContext } from '@context/screen'
import * as React from 'react'
import { Worlds } from './Worlds'
import { WorldScreen } from './WorldScreen'

const Screens = React.memo(() => {
  const screen = React.useContext(screenContext)
  switch (screen.current) {
    case Screen.Main:
      return <Worlds />
    case Screen.World:
      return <WorldScreen />
    default:
      return null
  }
})

export { Screens }
