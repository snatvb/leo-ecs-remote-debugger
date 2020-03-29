import { Theme } from '@theme/default'
import { ipcRenderer } from 'electron'
import * as React from 'react'
import styled, { createGlobalStyle } from 'styled-components'
import { KeyCode, Modifier, Shortcut, useShortcut } from '../helpers/hooks/useShortcut'
import { Screens } from './Screens'
import { TitleBar } from './TitleBar'

const Container = styled.div`
  background: ${Theme.color.bg.dark};
  color: ${Theme.color.text};
  width: 100%;
  height: 100%;
  overflow: hidden;
  box-sizing: border-box;
`

const Content = styled.div`
  z-index: 0;
  position: absolute;
  top: ${Theme.header.height}px;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: hidden;
  box-sizing: border-box;
`

const GlobalStyle = createGlobalStyle`
  html, body {
    -webkit-user-select: none;
  }
`

const App = () => {
  const quitShortcut: Shortcut = React.useMemo(() => ({
    keyCode: KeyCode.Q,
    modifier: Modifier.Ctrl,
    handler: () => {
      ipcRenderer.send('app-close')
    }
  }), [])

  useShortcut(quitShortcut)

  return (
    <Container>
      <GlobalStyle />
      <TitleBar />
      <Content>
          <Screens />
      </Content>
    </Container>
  )
}

export { App }
