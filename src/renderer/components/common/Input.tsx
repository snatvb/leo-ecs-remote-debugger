import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled, { css } from 'styled-components'

const InputContainer = styled.div`
  position: relative;
  width: 100%;
`

type InputElementProps = Readonly<{
  hasIcon: boolean
}>

const InputElement = styled.input`
  width: 100%;
  height: ${Theme.size.input.height.m}px;
  background: ${Theme.color.bg.extraDark};
  padding: ${Theme.offset.l}px ${Theme.offset.m}px;
  color: ${Theme.color.text};
  outline: none;
  border: none;
  border-radius: ${Theme.borderRadius.default}px;
  box-sizing: border-box;

  ${({ hasIcon }: InputElementProps) => hasIcon && css`
    padding-left: ${Theme.offset.m * 2 + 18}px;
  `}
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  color: ${Theme.color.bg.dark};
  left: ${Theme.offset.m}px;
  top: 0;
  height: 100%;
`

export type Props = React.ComponentProps<typeof InputElement> & Readonly<{
  icon?: IconDefinition
}>

export const Input = React.memo(({ icon, ...rest }: Props) => (
  <InputContainer>
    <InputElement {...rest} hasIcon={Boolean(icon)} />
    {icon && (
      <Icon>
        <FontAwesomeIcon icon={icon} />
      </Icon>
    )}
  </InputContainer>
))
