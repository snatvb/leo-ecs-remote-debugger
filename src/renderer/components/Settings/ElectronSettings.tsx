import { parseInteger } from '@helpers/parseInteger'
import { FormLabel } from '@renderer/components/common/FormLabel'
import { ElectronSettings as ElectronSettingsModel } from '@store/Models/UI/ElectronSettings'
import { observer } from 'mobx-react'
import { clamp } from 'ramda'
import * as React from 'react'
import { Button } from '../common/Button'
import { Input } from '../common/Input'
import { GridRow, InputContainer } from './styled-elements'

export type Props = Readonly<{
  settings: ElectronSettingsModel['settings'],
  onSave: (settings: ElectronSettingsModel['settings']) => void
}>

export const ElectronSettings = React.memo(observer(({
  settings,
  onSave,
}: Props) => {
  const [port, setPort] = React.useState<number | ''>(settings.ws.port)

  const handleChange = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget
    if (value.length > 0) {
      parseInteger(event.currentTarget.value)
        .map(clamp(0, 65535))
        .map(setPort)
    } else {
      setPort('')
    }
  }, [])

  const handleClickSave = React.useCallback((event: React.FormEvent<HTMLButtonElement>) => {
    const newPort = typeof port === 'number' ? port : settings.ws.port
    onSave({
      ...settings,
      ws: {
        ...settings.ws,
        port: newPort,
      },
    })
  }, [settings, port])

  return (
    <React.Fragment>
      <GridRow>
        <FormLabel>WebSocket Port</FormLabel>
        <InputContainer>
          <Input value={port} onChange={handleChange} />
        </InputContainer>
      </GridRow>
      <GridRow>
        <div></div>
        <Button onClick={handleClickSave}>Save</Button>
      </GridRow>
    </React.Fragment>
  )
}))
