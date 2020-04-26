import { Theme } from '@theme/default'
import styled from 'styled-components'

export const Container = styled.div`
  width: ${Theme.modals.width.settings}px;
  padding: ${Theme.offset.s}px ${Theme.offset.m}px;
  border-radius: ${Theme.borderRadius.default}px;
  background: ${Theme.color.bg.light};
  color: ${Theme.color.text};
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  top: 0;
  margin-top: ${Theme.offset.m}px;
`

export const InputContainer = styled.div`
  display: flex;
  flex: 1 2 auto;
`

export const Title = styled.div`
  font-size: ${Theme.size.font.xl}px;
  text-align: center;
  margin: ${Theme.offset.m}px 0;
`

export const Subtitle = styled.div`
  font-size: ${Theme.size.font.m}px;
  opacity: .8;
  text-align: center;
  margin-top: -${Theme.offset.m}px;
  margin-bottom: ${Theme.offset.m}px;
`

export const GridRow = styled.div`
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: ${Theme.offset.s}px;
`

export const Divider = styled.div`
  background-color: ${Theme.color.bg.dark};
  opacity: .5;
  height: 1px;
  width: 80%;
  margin: ${Theme.offset.l}px auto;
`
