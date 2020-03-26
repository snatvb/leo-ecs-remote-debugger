import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { store } from '@store'
import { EcsWorld } from '@store/Models/EcsWorld'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Subject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'
import styled from 'styled-components'
import { Input } from './Input'

const Container = styled.div`
  margin: ${Theme.offset.m}px;
  box-sizing: border-box;
`

export type Props = Readonly<{
  world: EcsWorld
}>

export const SearchEntities = React.memo(observer(({ world }: Props) => {
  const [input$] = React.useState(() => new Subject<string>())
  const [query, setQuery] = React.useState(
    store.ui.entitiesSearch
      .getQuery(world.id)
      .getOrElse('')
  )

  React.useEffect(() => {
    const subscription = input$
      .pipe(throttleTime(500, undefined, { trailing: true }))
      .subscribe((value: string) => {
        store.ui.entitiesSearch.setQuery(world.id, value)
      })

    return () => { subscription.unsubscribe() }
  }, [world.id])

  const handleChange = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value)
    input$.next(event.currentTarget.value)
  }, [])

  return (
    <Container>
      <Input
        icon={faSearch}
        value={query}
        onChange={handleChange}
        placeholder="Write component name..."
      />
    </Container>
  )
}))
