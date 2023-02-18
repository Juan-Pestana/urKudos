'use client'

import { useRef } from 'react'
import { pb } from '../sevices/pocketBase'
import { useStore } from '../store/store'
import { IsinglePostProps } from '../types/types'

interface IstoreProps {
  posts: IsinglePostProps[]
}

export default function StoreInitializer({ posts }: any) {
  const initialized = useRef(false)
  if (!initialized.current) {
    if (posts) {
      useStore.setState(() => ({ posts }))
    } else {
      useStore.setState({ posts: [] })
    }

    //pb.authStore.loadFromCookie(user)

    initialized.current = true
  }
  return null
}
