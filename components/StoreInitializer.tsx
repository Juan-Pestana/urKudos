'use client'

import { useRef } from 'react'

import { useStore } from '../store/store'
import { IsinglePostProps, Iuser } from '../types/types'

interface IstoreProps {
  posts?: IsinglePostProps[]
  user?: any
}

export default function StoreInitializer({ posts, user }: IstoreProps) {
  const initialized = useRef(false)

  if (!initialized.current) {
    if (posts) {
      useStore.setState(() => ({ posts }))
      useStore.setState(() => ({ user }))
    } else {
      useStore.setState({ posts: [] })
    }

    initialized.current = true
  }
  return null
}
