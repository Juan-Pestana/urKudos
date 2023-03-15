import PostUser from './PostUser'
import PostContent from './PostContent'
import LazyRender from './shared/LazyRender'

import Coments from './Coments'

import { IsinglePostProps } from '../../types/types'
import PostLabel from './shared/PostLabel'
import LikesComents from './LikesComents'
import CommentInput from './CommentInput'

export default function SinglePost(post: IsinglePostProps) {
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
        <LikesComents postLikes={[9, 8, 7, 5, 2, 1, 7]} postId={post.id} />
        <div className="border-t-2 border-solid border-slate-500 font-mono px-1 py-2">
          <LazyRender>
            <Coments postId={post.id} />
          </LazyRender>
        </div>

        <div className="flex gap-2 items-center border-t-2 border-slate-500 border-solid py-3 mt-3">
          <CommentInput postId={post.id} isResponse={false} />
        </div>
      </div>
    </div>
  )
}
