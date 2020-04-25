import { useStore } from '@store/hook'
import { observer } from 'mobx-react'
import * as React from 'react'
import { ModalContainer } from './common/ModalContainer'
import { EntityModal } from './EntityModal'

export const EntityModalStore = React.memo(observer(() => {
  const store = useStore()
  const entityWatching = store.ui.modals.entityModal.getEntityId().getOrElse(undefined)
  const isShowing = entityWatching !== undefined

  const handleOnClose = React.useCallback(() => {
    store.ui.modals.entityModal.close()
  }, [])

  return (
    <ModalContainer showing={isShowing} onClose={handleOnClose}>
      {entityWatching !== undefined && (
        <EntityModal entityId={entityWatching.entityId} worldId={entityWatching.worldId} />
      )}
    </ModalContainer>
  )
}))
