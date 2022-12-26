import React from 'react'
import Image from 'next/image'
import PostUser from './PostUser'
import PostContent from './PostContent'
import LikesComents from './LikesComents'
import Coments from './Coments'

interface Iuser {
  id: string
  userName: string
  position: string
  image: string
}

type Icomments = {
  id: string
  text: string
  post: number
  user?: Iuser
  responses: string[]
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
    <div className="border-solid border-2 border-gray-500 rounded-lg mb-2">
      <PostUser
        postOwnerId={post.owner?.id}
        postOwnerImage={post.owner?.image}
        postOwnerName={post.owner?.userName}
        postOwnerPosition={post.owner?.position}
      />
      <PostContent postText={post.text} postImage={post.image} />
      <div className="px-2">
        <LikesComents
          postLikes={post.likes}
          postCommentsNum={post.comments.length}
        />
        {/* coments */}
        <Coments postComments={post.comments} />
      </div>
    </div>
  )
}
