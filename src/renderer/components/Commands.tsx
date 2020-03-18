import { useStore } from '@store/hook'
import { observer } from 'mobx-react'
import * as React from 'react'

export const Commands = observer(() => {
  const store = useStore()
  console.log([...store.commands.list])

  return (
    <>
      {store.commands.list.map(({ cmd }, index) => (
        <div key={index}>{cmd}</div>
      ))}
    </>
  )
})
