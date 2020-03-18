import * as React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import styled from 'styled-components'
import { World } from './World'

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`

export type Props = Readonly<{
  id: number
}>

export const WorldWithScrollBar = React.memo(({ id }: Props) => {
  const [height, setHeight] = React.useState(0)
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setHeight(containerRef.current.clientHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)

    return () => {
      window.removeEventListener(' resize', updateHeight)
    }
  }, [])

  return (
    <Container ref={containerRef}>
      <Scrollbars autoHeight autoHeightMax={height}>
        <World id={id} />
      </Scrollbars>
    </Container>
  )
})
