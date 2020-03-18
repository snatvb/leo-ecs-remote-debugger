import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { keys } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Entity } from './Entity'

const Container = styled.div`
  color: ${Theme.color.actionText};
  font-size: ${Theme.size.font.xl};
  margin: ${Theme.offset.xl};
  background: ${Theme.color.darkAction};
  border-radius: ${Theme.borderRadius.default};
`

const NotFound = styled.div`
  color: ${Theme.color.actionText};
  font-size: ${Theme.size.font.xl};
  margin: ${Theme.offset.xl};
  background: ${Theme.color.darkAction};
  border-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.m} ${Theme.offset.l};
  text-align: center;
`

const Header = styled.div`
  background: ${Theme.color.action};
  border-top-left-radius: ${Theme.borderRadius.default};
  border-top-right-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.m} ${Theme.offset.l};
  display: flex;
  justify-content: space-between;
`

const Title = styled.div`
`

const RemoveLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
`

const Content = styled.div`
  padding: ${Theme.offset.m} ${Theme.offset.l};
`

export type Props = Readonly<{
  id: number
}>

export const World = React.memo(observer(({ id }: Props) => {
  const store = useStore()

  console.log(store.getWorld(id))
  const handleRemove = React.useCallback(() => {
    store.removeWorld(id)
  }, [store, id])

  return store.getWorld(id).caseOf({
    Nothing: () => <NotFound>World not found</NotFound>,
    Just: (world) => (
      <Container>
        <Header>
          <Title>World {id}</Title>
          {!world.isAlive && <RemoveLink onClick={handleRemove}>Remove</RemoveLink>}
        </Header>
        <Content>
          {keys(world.entities.items).map((entityId: number) => (
            <Entity key={`${id}-${entityId}`} worldId={id} id={entityId} />
          ))}
        </Content>
      </Container>
    ),
  })
}))
