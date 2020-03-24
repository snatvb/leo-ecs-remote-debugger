import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { keys } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { EntityStore } from './EntityStore'

const Container = styled.div`
  font-size: ${Theme.size.font.xl}px;
  background: ${Theme.color.bg.medium};
  border-radius: ${Theme.borderRadius.default}px;
`

const NotFound = styled.div`
  font-size: ${Theme.size.font.xl}px;
  margin: ${Theme.offset.xl}px;
  background: ${Theme.color.bg.medium};
  border-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
  text-align: center;
`

const Header = styled.div`
  background: ${Theme.color.bg.light};
  border-top-left-radius: ${Theme.borderRadius.default}px;
  border-top-right-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
  display: flex;
  justify-content: space-between;
`

const Title = styled.div`
`

const RemoveLink = styled.div`
  text-decoration: underline;
  cursor: pointer;
  color: ${Theme.color.link};
`

const Content = styled.div`
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
`

const Empty = styled.div`
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
`

export type Props = Readonly<{
  id: number
}>

export const World = React.memo(observer(({ id }: Props) => {
  const store = useStore()

  const handleRemove = React.useCallback(() => {
    store.removeWorld(id)
  }, [store, id])

  return store.getWorld(id).caseOf({
    Nothing: () => <NotFound>World not found</NotFound>,
    Just: (world) => {
      const entityKeys = keys(world.entities.items)

      return (
        <Container>
          <Header>
            <Title>World {id}</Title>
            {!world.isAlive && <RemoveLink onClick={handleRemove}>Remove</RemoveLink>}
          </Header>
          <Content>
            {entityKeys.map((entityId: number) => (
              <EntityStore key={`${id}-${entityId}`} worldId={id} id={entityId} />
            ))}
            {entityKeys.length === 0 && (
              <Empty>World don't have any entities</Empty>
            )}
          </Content>
        </Container>
      )
    },
  })
}))
