import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { EntityStore } from './EntityStore'

const Container = styled.div`
  width: ${Theme.modals.width.entity}px;
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

const Title = styled.div`
  font-size: ${Theme.size.font.xl}px;
  text-align: center;
  margin: ${Theme.offset.m}px 0;
`

const Body = styled.div`
  padding: ${Theme.offset.m}px;
`

export type Props = Readonly<{
  entityId: number
  worldId: number
}>

export const EntityModal = React.memo(observer(({ entityId, worldId }: Props) => {

  return (
    <Container>
      <Title>Watching Entity</Title>
      <Body>
        <EntityStore worldId={worldId} id={entityId} />
      </Body>
    </Container>
  )
}))
