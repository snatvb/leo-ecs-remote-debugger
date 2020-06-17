import { parseInteger } from '@helpers/parseInteger'
import { Checkbox } from '@renderer/components/common/Checkbox'
import { FormLabel } from '@renderer/components/common/FormLabel'
import { ThrottleInput } from '@renderer/components/common/ThrottleInput'
import { useStore } from '@store/hook'
import { observer } from 'mobx-react'
import * as React from 'react'
import { ElectronSettingsStore } from './ElectronSettingsStore'
import { Container, Divider, GridRow, InputContainer, Subtitle, Title } from './styled-elements'

const THROTTLE_INPUT_TIMEOUT = 1500

export type Props = Readonly<{
}>

const MIN_WORLD_PERIOD = 700
const MIN_ENTITY_PERIOD = 30

const cleanWorldPeriod = (period: number) => period < MIN_WORLD_PERIOD ? MIN_WORLD_PERIOD : period
const cleanEntityPeriod = (period: number) => period < MIN_ENTITY_PERIOD ? MIN_ENTITY_PERIOD : period

export const Settings = React.memo(observer(({
}: Props) => {
  const store = useStore()

  const handleChangeOpenedWorld = React.useCallback((value: string) => {
    parseInteger(value).map((period: number) => {
      store.ui.requestPeriod.openedWorld = cleanWorldPeriod(period)
    })
  }, [])

  const handleChangeOpenedEntity = React.useCallback((value: string) => {
    parseInteger(value).map((period: number) => {
      store.ui.requestPeriod.openedEntity = cleanEntityPeriod(period)
    })
  }, [])

  const handleChangeDisplayComponentContent = React.useCallback((checked: boolean) => {
    store.ui.settings.displayComponentContent = checked
  }, [])

  return (
    <Container>
      <Title>Settings</Title>
      <GridRow>
        <FormLabel>Request period opened world (ms)</FormLabel>
        <InputContainer>
          <ThrottleInput
            timeout={THROTTLE_INPUT_TIMEOUT}
            onChange={handleChangeOpenedWorld}
            initialValue={store.ui.requestPeriod.openedWorld.toString()}
          />
        </InputContainer>
      </GridRow>
      <GridRow>
        <FormLabel>Request period opened entity (ms)</FormLabel>
        <InputContainer>
          <ThrottleInput
            timeout={THROTTLE_INPUT_TIMEOUT}
            onChange={handleChangeOpenedEntity}
            initialValue={store.ui.requestPeriod.openedEntity.toString()}
          />
        </InputContainer>
      </GridRow>
      <GridRow>
        <FormLabel>Display component content in world</FormLabel>
        <InputContainer>
          <Checkbox
            checked={store.ui.settings.displayComponentContent}
            onChange={handleChangeDisplayComponentContent}
          />
        </InputContainer>
      </GridRow>
      <Divider />
      <Title>Application settings</Title>
      <Subtitle>After save this category need reload application</Subtitle>
      <ElectronSettingsStore />
    </Container>
  )
}))
