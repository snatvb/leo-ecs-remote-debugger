import { Provider as ScreenProvider } from '@context/screen'
import { Theme } from '@theme/default'
import { ipcRenderer } from 'electron'
import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { KeyCode, Modifier, Shortcut, useShortcut } from '../helpers/hooks/useShortcut'
import { Screens } from './Screens'

const Container = styled.div`
  background: ${Theme.color.bg.dark};
  color: ${Theme.color.text};
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: ${Theme.borderRadius.default};
  box-sizing: border-box;
`

const Draggable = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${Theme.offset.xl}px;
  -webkit-app-region: drag;
`

const GlobalStyle = createGlobalStyle`
  html, body {
    background: transparent;
    -webkit-user-select: none;
  }
`

const App = () => {
  const shortcut: Shortcut = React.useMemo(() => ({
    keyCode: KeyCode.Q,
    modifier: Modifier.Ctrl,
    handler: () => {
      ipcRenderer.send('app-close')
    }
  }), [])

  useShortcut(shortcut)

  return (
    <Container>
      <Draggable />
      <GlobalStyle />
      <ScreenProvider>
        <Screens />
      </ScreenProvider>
    </Container>
  )
}

export { App }
