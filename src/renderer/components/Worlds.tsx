import { faDoorOpen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useGetHeight } from '@helpers/hooks/useGetHeight'
import { useStore } from '@store/hook'
import { ipcRenderer } from 'electron'
import { keys } from 'mobx'
import { observer } from 'mobx-react'
import * as React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import styled, { css } from 'styled-components'
import { Theme } from '../theme/default'
import { ScreenFooter } from './ScreenFooter'
import { ScreenFooterButton } from './ScreenFooterButton'
import { SmallConfirm } from './SmallConfirm'
import { WorldCard } from './WorldCard'

const Container = styled.div`
  height: 100%;
  width: 100%;
  padding: ${Theme.offset.xl}px;
  padding-bottom: ${Theme.offset.xl + Theme.footer.height}px;
  box-sizing: border-box;
`
const ScrollWrapper = styled.div`
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`

const Empty = styled.div`
width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${Theme.size.font.xxl}px;
`

type ConfirmWrapperProps = {
  show: boolean
}

const ConfirmWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  z-index: 3;
  transform: translateY(100%) translateX(-50%);
  transition: transform 300ms cubic-bezier(.61,.01,.41,1.84);

  ${({ show }: ConfirmWrapperProps) => show && css`
    transform: translateY(-90%) translateX(-50%);
    -webkit-app-region: no-drag;
  `}
`

const Exit = styled(ScreenFooterButton)`
  padding-left: ${Theme.offset.l}px;
  justify-content: flex-start;
  width: 100%;
`

export const Worlds = React.memo(observer(() => {
  const store = useStore()
  const [isShowingConfirmExit, setIsShowingConfirmExit] = React.useState(false)
  const [height, containerRef] = useGetHeight()

  const handleConfirmExit = React.useCallback(() => {
    ipcRenderer.send('app-close')
  }, [])

  const handleCancelExit = React.useCallback(() => {
    setIsShowingConfirmExit(false)
  }, [])

  const handleExit = React.useCallback(() => {
    setIsShowingConfirmExit(!isShowingConfirmExit)
  }, [isShowingConfirmExit])

  return (
    <Container>
      <ScrollWrapper ref={containerRef}>
        {store.worlds.size === 0 ? (
          <Empty>No worlds to display</Empty>
        ) : (
            <Scrollbars autoHeight autoHeightMax={height}>
              <Grid>
                {keys(store.worlds).map((worldId: number) => (
                  <WorldCard key={worldId} id={worldId} />
                ))}
              </Grid>
            </Scrollbars>
          )}
      </ScrollWrapper>
      <ScreenFooter>
        <Exit onClick={handleExit}>
          <FontAwesomeIcon icon={faDoorOpen} />
        </Exit>
      </ScreenFooter>
      <ConfirmWrapper show={isShowingConfirmExit}>
        <SmallConfirm
          onConfirm={handleConfirmExit}
          onCancel={handleCancelExit}
        />
      </ConfirmWrapper>
    </Container>
  )
}))
