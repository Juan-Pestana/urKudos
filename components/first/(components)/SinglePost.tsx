import PostUser from './PostUser'
import PostContent from './PostContent'
import LazyRender from './LazyRender'

import Coments from './Coments'

import { IsinglePostProps } from '../../../types/types'
import PostLabel from './shared/PostLabel'

export default function SinglePost(post: IsinglePostProps) {
  console.log(post.type)
  return (
    <div
      className={`border-solid ${
        post.type != 'star'
          ? 'border-gray-500 border-2'
          : 'border-yellow-500 border-4'
      } rounded-lg my-2 relative`}
    >
      <PostLabel type={post.type} />
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
