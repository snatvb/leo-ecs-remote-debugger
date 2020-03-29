import { ModalContainer } from '@renderer/components/common/ModalContainer'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { Settings } from './Settings'

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

export type Props = Readonly<{
  defaultDisplayModal?: boolean
}>

export const ShowButton = React.memo(({
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
        <Settings />
      </ModalContainer>
    </Container>
  )
})
