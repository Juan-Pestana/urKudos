'use client'

import { useEffect, useRef } from 'react'

import { useStore } from '../store/store'
import { IsinglePostProps, Iuser } from '../types/types'

interface IstoreProps {
  posts?: IsinglePostProps[]
  user?: any
}

export default function StoreInitializer({ posts, user }: IstoreProps) {
  const initialized = useRef(false)

  const newPosts = useStore((state) => state.newPostsOnScroll)

  if (!initialized.current) {
    if (posts && user) {
      useStore.setState(() => ({ user }))
    } else {
      useStore.setState({ posts: [] })
    }

    initialized.current = true
  }
  useEffect(() => {
    if (posts) {
      newPosts(posts)
    }
  }, [posts])

  return null
}
