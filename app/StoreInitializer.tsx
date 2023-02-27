'use client'

import { useRef } from 'react'

import { useStore } from '../store/store'
import { IsinglePostProps } from '../types/types'

interface IstoreProps {
  posts?: IsinglePostProps[]
}

export default function StoreInitializer({ posts }: IstoreProps) {
  const initialized = useRef(false)

  if (!initialized.current) {
    if (posts) {
      useStore.setState(() => ({ posts }))
    } else {
      useStore.setState({ posts: [] })
    }

    initialized.current = true
  }
  return null
}
