import { parseInteger } from '@helpers/parseInteger'
import { FormLabel } from '@renderer/components/common/FormLabel'
import { ThrottleInput } from '@renderer/components/common/ThrottleInput'
import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

const THROTTLE_INPUT_TIMEOUT = 1500

const Container = styled.div`
  width: ${Theme.modals.width.settings}px;
  padding: ${Theme.offset.s}px ${Theme.offset.m}px;
  border-radius: ${Theme.borderRadius.default}px;
  background: ${Theme.color.bg.light};
  color: ${Theme.color.text};
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  margin-top: ${Theme.offset.m}px;
`

const InputContainer = styled.div`
  display: flex;
  flex: 1 2 auto;
`

const Title = styled.div`
  font-size: ${Theme.size.font.xl}px;
  text-align: center;
  margin: ${Theme.offset.m}px 0;
`

const GridRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: ${Theme.offset.s}px;
`

export type Props = Readonly<{
}>

export const Settings = React.memo(observer(({
}: Props) => {
  const store = useStore()

  const handleChangeOpenedWorld = React.useCallback((value: string) => {
    parseInteger(value).map((period: number) => {
      store.ui.requestPeriod.openedWorld = period
    })
  }, [])

  const handleChangeOpenedEntity = React.useCallback((value: string) => {
    parseInteger(value).map((period: number) => {
      store.ui.requestPeriod.openedEntity = period
    })
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
    </Container>
  )
}))
