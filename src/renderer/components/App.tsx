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
  box-sizing: border-box;
`

const Title = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: ${Theme.header.height}px;
  font-size: ${Theme.size.font.m}px;
  background: ${Theme.color.action.first};
  color: ${Theme.color.darkAction.first};
  font-weight: bold;
  padding: 0 ${Theme.offset.xl}px;
  box-sizing: border-box;
  -webkit-app-region: drag;
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
      <Title>
        <div>Leo ECS</div>
        <div>Remote Debugger</div>
      </Title>
      <GlobalStyle />
      <Content>
        <ScreenProvider>
          <Screens />
        </ScreenProvider>
      </Content>
    </Container>
  )
}

export { App }
