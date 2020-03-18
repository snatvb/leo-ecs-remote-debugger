import { useStore } from '@store/hook'
import { keys } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { WorldCard } from './WorldCard'

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

export const Worlds = React.memo(observer(() => {
  const store = useStore()

  return (
    <Container>
      {keys(store.worlds).map((worldId: number) => (
        <WorldCard key={worldId} id={worldId} />
      ))}
    </Container>
  )
}))
