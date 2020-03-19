import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { lighten } from 'polished'
import * as React from 'react'
import styled from 'styled-components'
import { Theme } from '../theme/default'

const Container = styled.div`
  display: flex;
  border-radius: ${Theme.borderRadius.default}px;
  overflow: hidden;
`

const Button = styled.div`
  padding: ${Theme.offset.l}px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  cursor: pointer;
  transition: ${Theme.transition.default};
  -webkit-app-region: no-drag;
`

const Confirm = styled(Button)`
  background: ${Theme.color.action.first};
  color: ${Theme.color.darkAction.first};
  cursor: pointer;

  &:hover {
    background: ${lighten(0.2, Theme.color.action.first)}
  }
`

const Cancel = styled(Button)`
  background: ${Theme.color.error.default};
  color: ${Theme.color.error.dark};

  &:hover {
    background: ${lighten(0.05, Theme.color.error.default)}
  }
`

export type Props = Readonly<{
  onConfirm?(): void;
  onCancel?(): void;
}>

export const SmallConfirm = React.memo(({ onConfirm, onCancel }: Props) => (
  <Container>
    <Confirm onClick={onConfirm}>
      <FontAwesomeIcon icon={faCheck} />
    </Confirm>
    <Cancel onClick={onCancel}>
      <FontAwesomeIcon icon={faTimes} />
    </Cancel>
  </Container>
))
