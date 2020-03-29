import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'
import { ShowButton as SettingsShowButton } from './Settings/ShowButton'

const Container = styled.div`
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

export const TitleBar = () => (
  <Container>
    <div>Leo ECS</div>
    <SettingsShowButton />
    <div>Remote Debugger</div>
  </Container>
)
