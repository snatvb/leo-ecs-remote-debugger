import { useStore } from '@store/hook'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Entity } from './Entity'

export type Props = Readonly<{
  id: number
  worldId: number
}>

export const EntityStore = React.memo(observer(({ worldId, id }: Props) => {
  const store = useStore()

  return store
    .getWorld(worldId)
    .map((world) => world.getEntity(id))
    .join()
    .caseOf({
      Nothing: () => null,
      Just: (entity) => <Entity value={entity} />,
    })
}))
