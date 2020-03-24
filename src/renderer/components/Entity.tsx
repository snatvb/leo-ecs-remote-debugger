import { EcsEntity } from '@store/Models/EcsEntity'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { EntityComponent } from './EntityComponent'

const Container = styled.div`
  font-size: ${Theme.size.font.xl}px;
  margin: ${Theme.offset.m}px;
  background: ${Theme.color.bg.dark};
  border-radius: ${Theme.borderRadius.default}px;
  cursor: pointer;
`

const Header = styled.div`
  background: ${Theme.color.bg.medium};
  border: 1px solid ${Theme.color.bg.dark};
  border-bottom: none;
  border-top-left-radius: ${Theme.borderRadius.default}px;
  border-top-right-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
  display: flex;
  align-items: center;
`
const Content = styled.div`
  border-bottom-left-radius: ${Theme.borderRadius.default}px;
  border-bottom-right-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`

export type Props = Readonly<{
  value: EcsEntity
}>

enum ContentState {
  Pending,
  Invalid,
  Ok,
}

const getContentState = (entity: EcsEntity): ContentState => {
  if (!entity.loaded) {
    return ContentState.Pending
  }

  if (entity.components.length > 0) {
    return ContentState.Ok
  }

  return ContentState.Invalid
}

export const Entity = React.memo(({ value }: Props) => {
  const contentState = getContentState(value)

  return (
    <Container>
      <Header>Entity {value.id}</Header>
      <Content>
        {contentState === ContentState.Ok && value.components.map((component, index) => (
          <EntityComponent
            key={`[${value.id}]-${component.name}-${index}`}
            value={component}
          />
        ))}
        {contentState === ContentState.Pending && 'Loading...'}
        {contentState === ContentState.Invalid && 'Error: entity without component. Memory leaked.'}
      </Content>
    </Container>
  )
})
