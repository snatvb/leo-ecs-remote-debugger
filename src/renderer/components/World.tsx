import { includes } from '@helpers/includes'
import { useStore } from '@store/hook'
import { EcsWorld } from '@store/Models/EcsWorld'
import { Theme } from '@theme/default'
import { keys } from 'mobx'
import { observer } from 'mobx-react'
import { Maybe } from 'monad-maniac'
import * as React from 'react'
import styled from 'styled-components'
import { EntityStore } from './EntityStore'
import { SearchEntities } from './SearchEntities'

const MAX_RENDER_ENTITIES = 50

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
  padding: ${Theme.offset.s}px ${Theme.offset.s}px;
`

const Empty = styled.div`
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
`

export type Props = Readonly<{
  world: EcsWorld
}>

const findEntities = (world: EcsWorld, query: string) => (entityId: number): boolean => (
  world
  .getEntity(entityId)
  .filter((entity) => includes((component) => (
    new RegExp(query, 'i').test(component.name)
  ), entity.components.values()))
  .caseOf({
    Just: () => true,
    Nothing: () => false,
  })
)

const getEntityKeys = (world: EcsWorld, querySearch: Maybe.Shape<string>) => (
  querySearch
    .filter((query) => query.length > 0)
    .caseOf({
      Just: (query) =>  (
        keys(world.entities.items)
          .filter(findEntities(world, query))
          .slice(0, MAX_RENDER_ENTITIES)
      ),
      Nothing: () => keys(world.entities.items).slice(0, MAX_RENDER_ENTITIES),
    })
)

export const World = React.memo(observer(({ world }: Props) => {
  const store = useStore()

  const querySearch = store.ui.entitiesSearch.getQuery(world.id)

  const entityKeys = getEntityKeys(world, querySearch)

  return (
    <Container>
      <Header>
        <Title>World {world.id}</Title>
        {/* {!world.isAlive && <RemoveLink onClick={handleRemove}>Remove</RemoveLink>} */}
      </Header>
      <SearchEntities world={world} />
      <Content>
        {entityKeys.map((entityId: number) => (
          <EntityStore key={`${world.id}-${entityId}`} worldId={world.id} id={entityId} />
        ))}
        {entityKeys.length === 0 && (
          <Empty>World don't have any entities</Empty>
        )}
      </Content>
    </Container>
  )
}))
