import styled from 'styled-components'
import { Theme } from '../theme/default'

export const ScreenFooterButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex: 1 1 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0);
  cursor: pointer;
  transition: ${Theme.transition.default};

  &:hover {
    background: rgba(255, 255, 255, .3);
  }
`
