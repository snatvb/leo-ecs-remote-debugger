import { Screen, screenContext } from '@context/screen'
import { faChevronLeft, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { ScreenFooter } from './ScreenFooter'
import { ScreenFooterButton } from './ScreenFooterButton'
import { WorldScreen } from './WorldScreen'

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  padding: ${Theme.offset.s}px;
  padding-top: ${Theme.offset.xl}px;
  padding-bottom: ${Theme.offset.s + Theme.footer.height}px;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
  box-sizing: border-box;
`

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NotFound = styled.div`
  font-size: ${Theme.size.font.xxl}px;
  background: ${Theme.color.bg.light};
  border-radius: ${Theme.borderRadius.default}px;
  padding: ${Theme.offset.xl}px;
`

const BackToMainScreen = styled(ScreenFooterButton)`
  padding-left: ${Theme.offset.l}px;
  justify-content: flex-start;
`

const AddWorldScreen = styled(ScreenFooterButton)`
  padding-right: ${Theme.offset.l}px;
  justify-content: flex-end;
`

export const WorldsScreen = observer(() => {
  const store = useStore()
  const screen = React.useContext(screenContext)

  const backToMainScreen = React.useCallback(() => {
    screen.change(Screen.Main)
  }, [screen.change])

  const handleClose = React.useCallback((worldId: number) => {
    store.ui.closeWorld(worldId)
  }, [screen.change])

  const openSecondWorld = React.useCallback(() => {
    store.ui.isOpenSecond = true
    screen.change(Screen.Main)
  }, [screen.change])

  const { firstWorld, secondWorld } = store.ui
  const noOneWorld = firstWorld.isNothing() && secondWorld.isNothing()
  const bothWorld = firstWorld.isJust() && secondWorld.isJust()

  console.log('noOneWorld', noOneWorld)
  React.useEffect(() => {
    console.log('noOneWorld effect', noOneWorld)
    if (noOneWorld) {
      screen.change(Screen.Main)
    }
  }, [noOneWorld, screen.change])

  return (
    <Container>
      {noOneWorld && (
        <NotFoundWrapper>
          <NotFound>Worlds not found</NotFound>
        </NotFoundWrapper>
      )}
      {store.ui.firstWorld.caseOf({
        Nothing: () => null,
        Just: (worldId) => (
          <WorldScreen
            worldId={worldId}
            noOneWorld={noOneWorld}
            bothWorld={bothWorld}
            onClose={handleClose}
          />
        ),
      })}
      {store.ui.secondWorld.caseOf({
        Nothing: () => null,
        Just: (worldId) => (
          <WorldScreen
            worldId={worldId}
            noOneWorld={noOneWorld}
            bothWorld={bothWorld}
            onClose={handleClose}
          />
        ),
      })}
      <ScreenFooter>
        <BackToMainScreen  onClick={backToMainScreen}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </BackToMainScreen>
        {!bothWorld && (
          <AddWorldScreen  onClick={openSecondWorld}>
            <FontAwesomeIcon icon={faPlus} />
          </AddWorldScreen>
        )}
      </ScreenFooter>
    </Container>
  )
})
