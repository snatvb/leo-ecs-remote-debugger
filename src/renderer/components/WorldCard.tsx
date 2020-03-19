import { Screen, screenContext } from '@context/screen'
import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  font-size: ${Theme.size.font.xl};
  margin: ${Theme.offset.xl};
  background: ${Theme.color.bg.medium};
  border-radius: ${Theme.borderRadius.default};
  cursor: pointer;
`

const Header = styled.div`
  background: ${Theme.color.bg.light};
  border-top-left-radius: ${Theme.borderRadius.default};
  border-top-right-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.m} ${Theme.offset.l};
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
  padding: ${Theme.offset.m} ${Theme.offset.l};
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
    store.ui.setFirstWorld(id)
    screen.change(Screen.World)
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
