'use client'
import { useMemo, useState, createRef, useEffect } from 'react'

interface IlazyRenderProps {
  threshold?: number
  rootMargin?: string
  onVisible?: () => void
  isLast: boolean
  children: React.ReactNode
}

export default function LazyRender({
  threshold,
  rootMargin,
  onVisible,
  isLast,
  children,
}: IlazyRenderProps) {
  const ref = useMemo(() => createRef<HTMLDivElement>(), [])

  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    // shouldn't happen but makes TS happy
    if (!ref.current) {
      return
    }

    const options = {
      rootMargin: rootMargin ?? '0px',
      threshold: threshold ?? 1,
    }

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()

          if (onVisible) {
            onVisible()
          }
        }
      })
    }, options)

    observer.observe(ref.current)

    // clean up when the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, ref, isLast, onVisible])

  return <div ref={ref}>{isVisible ? children : null}</div>
}
