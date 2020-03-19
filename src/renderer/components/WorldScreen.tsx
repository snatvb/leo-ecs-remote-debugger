import { Screen, screenContext } from '@context/screen'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useStore } from '@store/hook'
import { Theme } from '@theme/default'
import { observer } from 'mobx-react'
import * as React from 'react'
import styled from 'styled-components'
import { WorldWithScrollBar } from './WorldWithScrollBar'

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: stretch;
`

const NotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const NotFound = styled.div`
  font-size: ${Theme.size.font.xxl};
  background: ${Theme.color.bg.light};
  border-radius: ${Theme.borderRadius.default};
  padding: ${Theme.offset.xl};
`

const WorldWrapper = styled.div`
  flex: 1 1 auto;
  margin-bottom: ${parseInt(Theme.offset.xl, 10) + 30}px;
`

const BackToMainScreen = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0;
  left: 0;
  color: ${Theme.color.darkAction.first};
  font-size: ${Theme.size.font.xl};
  background: ${Theme.color.action.first};
  padding-left: ${Theme.offset.l};
  cursor: pointer;
`

export const WorldScreen = observer(() => {
  const store = useStore()
  const screen = React.useContext(screenContext)

  const backToMainScreen = React.useCallback(() => {
    screen.change(Screen.Main)
  }, [screen.change])

  const { firstWorld, secondWorld } = store.ui
  const noOneWorld = firstWorld.isNothing() && secondWorld.isNothing()

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
          <WorldWrapper>
              <WorldWithScrollBar id={worldId} />
          </WorldWrapper>
        ),
      })}
      <BackToMainScreen onClick={backToMainScreen}>
        <div>
          <FontAwesomeIcon icon={faChevronLeft} />
        </div>
      </BackToMainScreen>
    </Container>
  )
})
