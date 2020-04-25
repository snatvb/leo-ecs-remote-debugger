import { useGetHeight } from '@helpers/hooks/useGetHeight'
import { Theme } from '@theme/default'
import * as React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import styled from 'styled-components'
import { WorldStore } from './WorldStore'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const WorldWrapper = styled.div`
  padding: 0 ${Theme.offset.l}px;
  box-sizing: border-box;
`

export type Props = Readonly<{
  id: number
}>

export const WorldWithScrollBar = React.memo(({ id }: Props) => {
  const [height, containerRef] = useGetHeight()

  return (
    <Container ref={containerRef}>
      <Scrollbars autoHeight autoHeightMax={height}>
        <WorldWrapper>
          <WorldStore id={id} />
        </WorldWrapper>
      </Scrollbars>
    </Container>
  )
})
