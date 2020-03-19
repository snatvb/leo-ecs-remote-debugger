import { Screen, screenContext } from '@context/screen'
import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: ${Theme.size.font.xl}px;
  margin: ${Theme.offset.m}px;
  background: ${Theme.color.bg.medium};
  border-radius: ${Theme.borderRadius.default}px;
  cursor: pointer;
`

const Header = styled.div`
  background: ${Theme.color.bg.light};
  border-top-left-radius: ${Theme.borderRadius.default}px;
  border-top-right-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Title = styled.div`
  font-weight: bold;
`

const RemoveLink = styled.div`
  color: ${Theme.color.link};
  text-decoration: underline;
  cursor: pointer;
`

const Content = styled.div`
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
`

export type Props = Readonly<{
  id: number
}>

export const WorldCard = observer(({ id }: Props) => {
  const store = useStore()
  const screen = React.useContext(screenContext)

  const handleRemove = React.useCallback((event: React.SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault()
    event.stopPropagation()
    store.removeWorld(id)
  }, [store, id])

  const handleOpen = React.useCallback(() => {
    store.ui.openWorld(id)
    screen.change(Screen.Worlds)
  }, [store, id, screen])

  return store.getWorld(id).caseOf({
    Nothing: () => null,
    Just: (world) => (
      <Container onClick={handleOpen}>
        <Header>
          <Title>World {id}</Title>
          {!world.isAlive && (
            <RemoveLink onClick={handleRemove}>Remove</RemoveLink>
          )}
        </Header>
        <Content>
          Entities: {world.entities.items.size}
        </Content>
      </Container>
    ),
  })
})
