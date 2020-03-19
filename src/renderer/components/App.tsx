import { Provider as ScreenProvider } from '@context/screen'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { Screens } from './Screens'

const Container = styled.div`
  background: ${Theme.color.bg.dark};
  color: ${Theme.color.text};
  width: 100%;
  height: 100%;
  overflow: auto;
`

const App = React.memo(() => (
  <Container>
    <ScreenProvider>
      <Screens />
    </ScreenProvider>
  </Container>
))

export { App }
