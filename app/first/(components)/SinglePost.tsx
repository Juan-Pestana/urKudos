'use client'

import PostUser from './PostUser'
import PostContent from './PostContent'
import LazyRender from './LazyRender'

import Coments from './Coments'

import { IsinglePostProps } from '../../../types/types'

export default function SinglePost(post: IsinglePostProps) {
  return (
    <div className="border-solid border-2 border-gray-500 rounded-lg my-2">
      <PostUser
        postOwnerId={post.owner?.id}
        postOwnerImage={post.owner?.avatar}
        postOwnerName={post.owner?.name}
        postOwnerPosition={post.owner?.position}
      />
      <PostContent
        text={post.content.text}
        image={post.content.image}
        video={post.content.video}
        link={post.content.link}
      />
      <div className="px-2">
        {/* coments */}
        <LazyRender>
          <Coments postId={post.id} />
        </LazyRender>
      </div>
    </div>
  )
}
