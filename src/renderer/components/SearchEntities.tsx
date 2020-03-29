import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { store } from '@store'
import { EcsWorld } from '@store/Models/EcsWorld'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { ThrottleInput } from './common/ThrottleInput'

const THROTTLE_TIMEOUT = 500

const Container = styled.div`
  margin: ${Theme.offset.m}px;
  box-sizing: border-box;
`

export type Props = Readonly<{
  world: EcsWorld
}>

export const SearchEntities = React.memo(observer(({ world }: Props) => {
  const handleChange = React.useCallback((value: string) => {
    store.ui.entitiesSearch.setQuery(world.id, value)
  }, [world.id])

  return (
    <Container>
      <ThrottleInput
        key={world.id}
        timeout={THROTTLE_TIMEOUT}
        icon={faSearch}
        initialValue={store.ui.entitiesSearch.getQuery(world.id).getOrElse('')}
        onChange={handleChange}
        placeholder="Write component name..."
      />
    </Container>
  )
}))
