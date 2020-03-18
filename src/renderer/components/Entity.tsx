import { useStore } from '@store/hook'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`

export type Props = Readonly<{
  id: number
  worldId: number
}>

export const Entity = React.memo(observer(({ worldId, id }: Props) => {
  const store = useStore()

  return store
    .getWorld(worldId)
    .map((world) => world.getEntity(id))
    .join()
    .caseOf({
      Nothing: () => null,
      Just: (entity) => <Container>{entity.id}</Container>,
    })
}))
