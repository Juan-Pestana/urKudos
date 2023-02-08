'use client'

import { useRef } from 'react'
import { pb } from '../sevices/pocketBase'
import { useStore } from '../store/store'
import { IsinglePostProps } from '../types/types'

interface IstorePropos {
  posts: IsinglePostProps[] | []
  user: string
}

export default function StoreInitializer() {
  const initialized = useRef(false)
  if (!initialized.current) {
    useStore.setState({ posts: [], user: {} })

    //pb.authStore.loadFromCookie(user)

    initialized.current = true
  }
  return null
}
