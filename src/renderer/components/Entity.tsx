import { map } from '@helpers/map'
import { EcsEntity } from '@store/Models/EcsEntity'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
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
  padding: ${Theme.offset.s}px ${Theme.offset.s}px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
`

export type Props = Readonly<{
  value: EcsEntity
  onClick?: (event: React.SyntheticEvent<HTMLDivElement>) => void
  componentsWithData?: boolean
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

  if (entity.components.size > 0) {
    return ContentState.Ok
  }

  return ContentState.Invalid
}

export const Entity = React.memo(observer(({ value, onClick, componentsWithData = false }: Props) => {
  const contentState = getContentState(value)

  return (
    <Container onClick={onClick}>
      <Header>Entity {value.id}</Header>
      <Content>
        {contentState === ContentState.Ok && map((component, index) => (
          <EntityComponent
            withData={componentsWithData}
            key={`[${value.id}]-${component.name}-${index}`}
            value={component}
          />
        ), value.components.values())}
        {contentState === ContentState.Pending && 'Loading...'}
        {contentState === ContentState.Invalid && 'Error: entity without component. Memory leaked.'}
      </Content>
    </Container>
  )
}))
