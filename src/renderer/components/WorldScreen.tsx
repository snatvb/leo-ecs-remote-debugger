import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { WorldWithScrollBar } from './WorldWithScrollBar'

const Container = styled.div`
  width: 50%;
  height: 100%;
  position: relative;
  flex: 1 0 50%;

  & + & {
    border-left: 1px solid ${Theme.color.bg.medium};
  }
`

const Close = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: -12px;
  font-size: 18px;
  z-index: 1;
  border-radius: 9999px;
  background: ${Theme.color.action.first};
  color: ${Theme.color.darkAction.first};
  -webkit-app-region: no-drag;
`

export type Props = Readonly<{
  worldId: number
  noOneWorld: boolean
  bothWorld: boolean
  onClose(worldId: number): void
}>

export const WorldScreen = React.memo(({ worldId, bothWorld, onClose }: Props) => {
  const handleClose = React.useCallback(() => {
    // tslint:disable-next-line:no-unused-expression
    onClose && onClose(worldId)
  }, [worldId])

  return (
    <Container>
      {bothWorld && (
        <Close onClick={handleClose}>
          <FontAwesomeIcon icon={faTimes} />
        </Close>
      )}
      <WorldWithScrollBar id={worldId} />
    </Container>
  )
})
