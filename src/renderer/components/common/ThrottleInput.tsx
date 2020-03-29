import * as React from 'react'
import { Subject } from 'rxjs'
import { throttleTime } from 'rxjs/operators'
import { Input, Props as InputProps } from './Input'

export type Props = InputProps & Readonly<{
  timeout: number
  initialValue: HTMLInputElement['value']
  onChange(value: string): void
}>

export const ThrottleInput = React.memo(({ timeout, onChange, initialValue, ...rest }: Props) => {
  const [input$] = React.useState(() => new Subject<string>())

  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    const subscription = input$
      .pipe(throttleTime(timeout, undefined, { trailing: true, leading: true }))
      .subscribe((throttledValue: string) => {
        onChange(throttledValue)
      })

    return () => {
      input$.complete()
      subscription.unsubscribe()
     }
  }, [])

  const handleChange = React.useCallback((event: React.FormEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value
    setValue(newValue)
    input$.next(newValue)
  }, [input$])

  return (
    <Input {...rest} value={value} onChange={handleChange} />
  )
})
