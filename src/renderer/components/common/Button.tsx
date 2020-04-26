import { Theme } from '@theme/default'
import * as React from 'react'
import styled from 'styled-components'

const ButtonElement = styled.button`
  height: ${Theme.size.button.height.m}px;
  background-color: ${Theme.color.bg.medium};
  padding: 0 ${Theme.offset.m}px;
  color: ${Theme.color.text};
  outline: none;
  border: none;
  border-radius: ${Theme.borderRadius.default}px;
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${Theme.color.bg.dark};
  }

  &:active {
    box-shadow: inset 0px 3px 3px rgba(0, 0, 0, .2);
  }
`

export type Props = React.ComponentProps<typeof ButtonElement> & React.PropsWithChildren<{}>

export const Button = React.memo(({ children, ...rest }: Props) => (
  <ButtonElement {...rest}>
    {children}
  </ButtonElement>
))
