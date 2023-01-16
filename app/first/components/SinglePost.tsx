import PostUser from './PostUser'
import PostContent from './PostContent'

import Coments from './Coments'

interface Iuser {
  id: string
  userName: string
  position: string
  image: string
}

interface IsinglePostProps {
  id: string
  text: string
  image: string
  likes: number[]
  owner: Iuser | undefined
  comments: string[]
}

export default function SinglePost(post: IsinglePostProps) {
  return (
    <div className="border-solid border-2 border-gray-500 rounded-lg my-2">
      <PostUser
        postOwnerId={post.owner?.id}
        postOwnerImage={post.owner?.image}
        postOwnerName={post.owner?.userName}
        postOwnerPosition={post.owner?.position}
      />
      <PostContent postText={post.text} postImage={post.image} />
      <div className="px-2">
        {/* coments */}

        {post.comments && post.comments.length ? (
          /* @ts-expect-error Server Component */
          <Coments postId={post.id} />
        ) : null}
      </div>
    </div>
  )
}
