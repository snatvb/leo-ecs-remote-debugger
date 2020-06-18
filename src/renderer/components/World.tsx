import { getKeysWhatDisplay } from '@helpers/entity/getWhatDisplay'
import { EcsWorld } from '@store/Models/EcsWorld'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Empty = styled.div`
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
`

export type Props = Readonly<{
  world: EcsWorld
  componentWithData?: boolean
}>

export const World = React.memo(observer(({ world, componentWithData = true }: Props) => {
  const entityKeys = getKeysWhatDisplay(world)

  return (
    <Container>
      <Header>
        <Title>World {world.id}</Title>
        {/* {!world.isAlive && <RemoveLink onClick={handleRemove}>Remove</RemoveLink>} */}
      </Header>
      <SearchEntities world={world} />
      <Content>
        {entityKeys.map((entityId: number) => (
          <EntityStore
            key={`${world.id}-${entityId}`}
            worldId={world.id} id={entityId}
            componentsWithData={componentWithData}
          />
        ))}
        {entityKeys.length === 0 && (
          <Empty>World don't have any entities</Empty>
        )}
      </Content>
    </Container>
  )
}))
