import { useStore } from '@store/hook'
import { Screen } from '@store/Models/UI/ScreenStore'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Worlds } from './Worlds'
import { WorldsScreen } from './WorldsScreen'

const Screens = React.memo(observer(() => {
  const store = useStore()

  switch (store.ui.screen.current) {
    case Screen.Main:
      return <Worlds />
    case Screen.Worlds:
      return <WorldsScreen />
    default:
      return null
  }
}))

export { Screens }
