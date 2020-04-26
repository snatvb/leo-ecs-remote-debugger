import { useStore } from '@store/hook'
import { ElectronSettings as ElectronSettingsModel, State } from '@store/Models/UI/ElectronSettings'
import { observer } from 'mobx-react'
import * as React from 'react'
import { ElectronSettings } from './ElectronSettings'

export const ElectronSettingsStore = observer(() => {
  const store = useStore()
  const { state, settings } = store.ui.electronSettings

  React.useEffect(() => {
    if (state === State.Idle) {
      store.ui.electronSettings.state = State.Loading
    }
  }, [state])

  const handleSave = React.useCallback((newSettings: ElectronSettingsModel['settings']) => {
    if (state === State.Ready) {
      store.ui.electronSettings.save(newSettings)
    }
  }, [state])

  switch (state) {
    case State.Error:
      return <div>Error</div>

    case State.Idle:
    case State.Loading:
      return <div>Loading...</div>

    case State.Ready:
      return <ElectronSettings settings={settings} onSave={handleSave} />

    case State.Saving:
      return <div>Saving...</div>

    default:
      return null
  }
})
