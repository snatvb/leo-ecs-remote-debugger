import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { ModalContainer } from './ModalContainer'

const Container = styled.div`
  display: flex;
  -webkit-app-region: no-drag;
`

const Button = styled.button`
  display: flex;
  cursor: pointer;
  border: none;
  outline: none;
  padding: ${Theme.offset.s}px ${Theme.offset.m}px;
  background: ${Theme.color.darkAction.first};
  border-radius: ${Theme.borderRadius.default}px;
  font-size: ${Theme.size.font.s}px;
  color: ${Theme.color.action.first};
`

const Body = styled.div`
  width: ${Theme.modals.width.settings}px;
  padding: ${Theme.offset.s}px ${Theme.offset.m}px;
  border-radius: ${Theme.borderRadius.default}px;
  background: ${Theme.color.bg.light};
  color: ${Theme.color.text};
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  margin-top: ${Theme.offset.m}px;
`

export type Props = Readonly<{
  defaultDisplayModal?: boolean
}>

export const SettingsShowButton = React.memo(({
  defaultDisplayModal = false,
}: Props) => {
  const [displayModal, setDisplayModal] = React.useState(defaultDisplayModal)

  const handleClickSettings = React.useCallback(() => {
    setDisplayModal(!displayModal)
  }, [displayModal])

  const handleCloseModal = React.useCallback(() => {
    setDisplayModal(false)
  }, [])

  return (
    <Container>
      <Button onClick={handleClickSettings}>Settings</Button>
      <ModalContainer showing={displayModal} onClose={handleCloseModal}>
        <Body>
          This will text modal
        </Body>
      </ModalContainer>
    </Container>
  )
})
