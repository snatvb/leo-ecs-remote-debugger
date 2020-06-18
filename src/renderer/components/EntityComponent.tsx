import { EcsComponent } from '@store/Models/EcsComponent'
import { Theme } from '@theme/default'
import { jsonParse } from '@utils/jsonParse'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  border: 1px solid ${Theme.color.bg.extraDark};
  font-size: ${Theme.size.font.xl}px;
  margin: ${Theme.offset.s}px;
  background: ${Theme.color.darkAction};
  border-radius: ${Theme.borderRadius.default}px;
  cursor: pointer;
`

const Header = styled.div`
  background: ${Theme.color.bg.extraDark};
  border-top-left-radius: ${Theme.borderRadius.default}px;
  border-top-right-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.s}px ${Theme.offset.m}px;
  display: flex;
  align-items: center;
`
const Content = styled.pre`
  background: ${Theme.color.bg.dark};
  border-bottom-left-radius: ${Theme.borderRadius.default}px;
  border-bottom-right-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.s}px ${Theme.offset.m}px;
  display: flex;
  align-items: center;
  overflow: auto;
`

export type Props = Readonly<{
  value: EcsComponent
  withData?: boolean
}>

export const EntityComponent = React.memo(observer(({ value, withData = false }: Props) => {
  return (
    <Container>
      <Header>{value.name}</Header>
      {withData && (
        <Content>
          {jsonParse(value.data).map((json) => JSON.stringify(json, null, 2)).getOrElse(value.data)}
        </Content>
      )}
    </Container>
  )
}))
