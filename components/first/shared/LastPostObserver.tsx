'use client'
import { useMemo, useState, createRef, useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface IlastPostObserverProps {
  threshold?: number
  rootMargin?: string
  onVisible?: () => void
  totalPages: number
}

export default function LastPostObserver({
  threshold,
  rootMargin,
  onVisible,
  totalPages,
}: IlastPostObserverProps) {
  const [page, setPage] = useState<number>(1)

  const ref = useMemo(() => createRef<HTMLDivElement>(), [])

  const path = usePathname()

  const router = useRouter()
  //const searchParams = useSearchParams()

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
          // const parPage = searchParams?.get('page')
          //  console.log('esta es la page', parPage)

          // const page = parPage ? parseInt(parPage) : 1

          if (onVisible) {
            onVisible()
          }
        } else {
          setIsVisible(false)
        }
      })
    }, options)

    observer.observe(ref.current)

    // clean up when the component is unmounted
    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, ref, page, path, router, onVisible])

  useEffect(() => {
    if (isVisible && page != totalPages) {
      router.replace(path + `?page=${page + 1}`)
      setPage((prevPage) => prevPage + 1)
      router.refresh()
    } else {
      return
    }
  }, [isVisible])

  return <div ref={ref}></div>
}
