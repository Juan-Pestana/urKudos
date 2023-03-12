'use client'
import { useMemo, useState, createRef, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

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

  const path = usePathname()

  const router = useRouter()
  const searchParams = useSearchParams()
  const parPage = searchParams?.get('page')

  const page = parPage ? parseInt(parPage) : 1

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
          if (isLast) {
            router.replace(path + `?page=${page + 1}`)
            router.refresh()
          }

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
