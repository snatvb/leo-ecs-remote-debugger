import { EcsEntity } from '@store/Models/EcsEntity'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { EntityComponent } from './EntityComponent'

const Container = styled.div`
  font-size: ${Theme.size.font.xl}px;
  margin: ${Theme.offset.xl}px;
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

export const Entity = React.memo(({ value }: Props) => {
  return (
    <Container>
      <Header>Entity {value.id}</Header>
      <Content>
        {value.components.map((component, index) => (
          <EntityComponent
            key={`[${value.id}]-${component.name}-${index}`}
            value={component}
          />
        ))}
      </Content>
    </Container>
  )
})
