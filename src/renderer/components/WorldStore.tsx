import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { World } from './World'

const NotFound = styled.div`
  font-size: ${Theme.size.font.xl}px;
  margin: ${Theme.offset.xl}px;
  background: ${Theme.color.bg.medium};
  border-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.m}px ${Theme.offset.l}px;
  text-align: center;
`

export type Props = Readonly<{
  id: number
}>

export const WorldStore = React.memo(observer(({ id }: Props) => {
  const store = useStore()
  const componentWithData = store.ui.settings.displayComponentContent

  return store.getWorld(id).caseOf({
    Nothing: () => <NotFound>World not found</NotFound>,
    Just: (world) => <World world={world} componentWithData={componentWithData} />,
  })
}))
