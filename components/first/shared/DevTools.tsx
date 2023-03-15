'use client'

import { useEffect } from 'react'
import { useStore } from '../../../store/store'

export default function DevTools() {
  useEffect(() => {
    if (typeof window != undefined) {
      //@ts-expect-error
      const connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
        name: 'Posts State',
      })
      connection?.init(useStore.getState())

      let isUpdateFromDevtools = false
      connection?.subscribe((evt: any) => {
        if (evt.type === 'DISPATCH') {
          const newState = JSON.parse(evt.state)
          isUpdateFromDevtools = true
          useStore.setState(newState)
          isUpdateFromDevtools = false
        }
      })

      useStore.subscribe((newState) => {
        if (!isUpdateFromDevtools) {
          connection?.send('State', newState)
        }
      })
    }
  }, [])

  return null
}
