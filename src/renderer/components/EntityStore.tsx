import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { Entity } from './Entity'

const NotFound = styled.div`
  padding: ${Theme.offset.s}px ${Theme.offset.m}px;
  border-radius: ${Theme.borderRadius.default}px;
  background: ${Theme.color.bg.light};
  color: ${Theme.color.text};
  text-align: center;
`

export type Props = Readonly<{
  id: number
  worldId: number
  componentsWithData: boolean
}>

export const EntityStore = React.memo(observer(({ worldId, id, componentsWithData = false }: Props) => {
  const store = useStore()

  const handleClickEntity = React.useCallback(() => {
    store.ui.modals.entityModal.open(id, worldId)
  }, [id, worldId])

  return store
    .getWorld(worldId)
    .chain((world) => world.getEntity(id))
    .caseOf({
      Nothing: () => <NotFound>Entity({id}) was not found</NotFound>,
      Just: (entity) => <Entity value={entity} onClick={handleClickEntity} componentsWithData={componentsWithData} />,
    })
}))
