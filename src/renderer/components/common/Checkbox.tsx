import { faCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Theme } from '@theme/default'
import * as React from 'react'
import styled, { css } from 'styled-components'

const Container = styled.div`
  display: flex;
  width: ${Theme.size.checkbox.m}px;
  height: ${Theme.size.checkbox.m}px;
  justify-content: center;
  align-items: center;
  background-color: ${Theme.color.bg.medium};
  color: ${Theme.color.text};
  outline: none;
  border: none;
  font-size: 14px;
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

type CheckedProps = {
  checked: boolean
}
const Checked = styled.div`
  display: inline-flex;
  opacity: 0;
  transition: opacity 200ms ease;
  ${({ checked }: CheckedProps) => checked && css`opacity: 1`}
`

export type Props = Readonly<{
  onChange?: (checked: boolean) => void
  checked: boolean
}>

export const Checkbox = React.memo(({ checked, onChange }: Props) => {
  const handleClick = React.useCallback(() => {
    onChange && onChange(!checked)
  }, [checked])

  return (
    <Container onClick={handleClick}>
      <Checked checked={checked}>
        <FontAwesomeIcon icon={faCheck} />
      </Checked>
    </Container>
  )
})
