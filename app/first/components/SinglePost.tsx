import React from 'react'
import Image from 'next/image'
import PostUser from './PostUser'
import PostContent from './PostContent'
import LikesComents from './LikesComents'
import Coments from './Coments'

interface Iuser {
  id: number
  userName: string
  position: string
  image: string
}

interface Icomments {
  id: number
  text: string
  post: number
  user?: Iuser
  parent?: number
}

interface IsinglePostProps {
  id: number
  text: string
  image: string
  likes: number[]
  owner: Iuser | undefined
  comments: Icomments[]
}

export default function SinglePost(post: IsinglePostProps) {
  return (
    <div className="border-solid border-2 border-gray-500 rounded-lg">
      <PostUser />
      <PostContent />
      <div className="px-2">
        <LikesComents />
        {/* coments */}
        <Coments />
      </div>
    </div>
  )
}
