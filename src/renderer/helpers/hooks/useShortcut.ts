import { Maybe } from 'monad-maniac'
import * as React from 'react'

export enum KeyCode {
  Q = 81,
  Enter = 13,
  Ecs = 27,
}

export enum Modifier {
  Ctrl,
  Shift,
  Alt,
}

export type Shortcut = {
  keyCode: KeyCode
  modifier?: Modifier
  handler(event: KeyboardEvent): void;
}

const existModifier = (shortcut: Shortcut, event: KeyboardEvent) => (
  Maybe
    .of(shortcut.modifier)
    .map((modifier) => {
      switch (modifier) {
        case Modifier.Alt:
          return event.altKey
        case Modifier.Ctrl:
          return event.ctrlKey
          case Modifier.Shift:
            return event.shiftKey
        default:
          return false
      }
    })
    .caseOf({
      Nothing: () => true,
      Just: (result) => result,
    })
)

export const useShortcut = (shortcut: Shortcut) => {
  React.useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (shortcut.keyCode === event.keyCode && existModifier(shortcut, event)) {
        shortcut.handler(event)
      }
    }

    window.addEventListener('keydown', handleKeydown)

    return () => {
      window.removeEventListener('keydown', handleKeydown)
    }
  }, [shortcut])
}
