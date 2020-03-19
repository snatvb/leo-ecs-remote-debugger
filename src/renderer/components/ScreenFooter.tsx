import { Theme } from '@theme/default'
import styled from 'styled-components'

export const ScreenFooter = styled.div`
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  width: 100%;
  height: ${Theme.footer.height}px;
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${Theme.color.darkAction.first};
  font-size: ${Theme.size.font.xl}px;
  background: ${Theme.color.action.first};
  cursor: pointer;
  z-index: 2;
`
