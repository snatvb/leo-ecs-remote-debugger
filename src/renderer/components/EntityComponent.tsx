import { EcsComponent } from '@store/Models/EcsComponent'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid ${Theme.color.bg.extraDark};
  font-size: ${Theme.size.font.xl};
  margin: ${Theme.offset.xl};
  background: ${Theme.color.darkAction};
  border-radius: ${Theme.borderRadius.default};
  cursor: pointer;
`

const Header = styled.div`
  background: ${Theme.color.bg.extraDark};
  border-top-left-radius: ${Theme.borderRadius.default};
  border-top-right-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.m} ${Theme.offset.l};
  display: flex;
  align-items: center;
`
const Content = styled.div`
  background: ${Theme.color.bg.dark};
  border-bottom-left-radius: ${Theme.borderRadius.default};
  border-bottom-right-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.m} ${Theme.offset.l};
  display: flex;
  align-items: center;
`

export type Props = Readonly<{
  value: EcsComponent
}>

export const EntityComponent = React.memo(({ value }: Props) => {
  return (
    <Container>
      <Header>{value.name}</Header>
      <Content>
        Some params
      </Content>
    </Container>
  )
})
