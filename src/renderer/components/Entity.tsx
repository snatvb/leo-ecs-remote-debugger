import { EcsEntity } from '@store/Models/EcsEntity'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { EntityComponent } from './EntityComponent'

const Container = styled.div`
  font-size: ${Theme.size.font.xl};
  margin: ${Theme.offset.xl};
  background: ${Theme.color.bg.dark};
  border-radius: ${Theme.borderRadius.default};
  cursor: pointer;
`

const Header = styled.div`
  background: ${Theme.color.bg.medium};
  border: 1px solid ${Theme.color.bg.dark};
  border-bottom: none;
  border-top-left-radius: ${Theme.borderRadius.default};
  border-top-right-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.m} ${Theme.offset.l};
  display: flex;
  align-items: center;
`
const Content = styled.div`
  border-bottom-left-radius: ${Theme.borderRadius.default};
  border-bottom-right-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.m} ${Theme.offset.l};
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
        {value.components.map((component) => <EntityComponent value={component} />)}
      </Content>
    </Container>
  )
})
