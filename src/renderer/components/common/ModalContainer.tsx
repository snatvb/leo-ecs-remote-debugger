import { getElementById } from '@helpers/dom/getElementById'
import { KeyCode, Shortcut, useShortcut } from '@helpers/hooks/useShortcut'
import { Theme } from '@theme/default'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const ANIMATION_DURATION = Theme.transition.duration.default
const HALF_ANIMATION_DURATION = Theme.transition.duration.default * 0.5

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  position: absolute;
  background: rgba(0, 0, 0, .4);
  left: 0;
  right: 0;
  top: ${Theme.header.height}px;
  bottom: ${Theme.footer.height}px;
  transition: opacity ${HALF_ANIMATION_DURATION}ms ease;
  opacity: 0;
  box-sizing: border-box;

  &.showing-enter,
  &.showing-appear {
    opacity: 0;
  }

  &.showing-enter-done,
  &.showing-enter-active {
    opacity: 1;
  }
`

const Body = styled.div`
  display: flex;
  transition: transform ${ANIMATION_DURATION}ms ease;
  transform: translateY(100%);
  box-sizing: border-box;

  .showing-enter &,
  .showing-appear & {
    transform: translateY(100%);
  }

  .showing-enter-done &,
  .showing-enter-active & {
    transform: translateY(0%);
  }
`

export type Props = React.PropsWithChildren<Readonly<{
  showing?: boolean
  onClosed?(): void
  onClose?(event: React.SyntheticEvent<HTMLDivElement> | KeyboardEvent): void
}>>

export const ModalContainer = React.memo(({
  children,
  showing = false,
  onClosed,
  onClose,
}: Props) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const portalModals = React.useMemo(() => getElementById('portal-modals'), [])

  const handleClose = React.useCallback((event: React.SyntheticEvent<HTMLDivElement>) => {
    if (containerRef.current === event.target && typeof onClose === 'function') {
      onClose(event)
    }
  }, [onClose])

  const closeShortcut: Shortcut = React.useMemo(() => ({
    keyCode: KeyCode.Ecs,
    handler: (event) => {
      onClose && onClose(event)
    }
  }), [])

  useShortcut(closeShortcut)

  return portalModals.caseOf({
    Just: (portalContainer) => ReactDOM.createPortal(
      <CSSTransition
        in={showing}
        onExited={onClosed}
        classNames="showing"
        timeout={ANIMATION_DURATION}
        unmountOnExit
      >
        <Container ref={containerRef} onClick={handleClose}>
          <Body>
            {children}
          </Body>
        </Container>
      </CSSTransition>,
      portalContainer
    ),
    Nothing: () => null,
  })
})
