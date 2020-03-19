import * as React from 'react'

export const useGetHeight = (): [number, React.RefObject<HTMLDivElement>] => {
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

  return [height, containerRef]
}
