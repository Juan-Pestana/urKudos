import React from 'react'
import Image from 'next/image'
import PostUser from './PostUser'
import PostContent from './PostContent'
import LikesComents from './LikesComents'
import Coments from './Coments'

export default function SinglePost() {
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
