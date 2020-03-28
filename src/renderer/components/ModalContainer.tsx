import { getElementById } from '@helpers/dom/getElementById'
import { Theme } from '@theme/default'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'

const ANIMATION_DURATION = 300

const Container = styled.div`
  width: 100%;
  position: absolute;
  background: rgba(0, 0, 0, .4);
  left: 0;
  right: 0;
  top: ${Theme.header.height}px;
  bottom: ${Theme.footer.height}px;
  transition: opacity ${ANIMATION_DURATION * 0.5}ms ease;
  opacity: 0;
  box-sizing: border-box;

  &.showing-enter,
  &.showing-appear {
    opacity: 0;
  }

  &.showing-enter-done,
  &.showing-active {
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
  .showing-active & {
    transform: translateY(0%);
  }
`

export type Props = React.PropsWithChildren<Readonly<{
  showing?: boolean
  onClosed?(): void
  onClose?(event: React.SyntheticEvent<HTMLDivElement>): void
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
