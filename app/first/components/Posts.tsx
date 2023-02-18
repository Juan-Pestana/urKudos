'use client'
import SinglePost from './SinglePost'
import { useStore } from '../../../store/store'
import Comments from './Coments'

export default function Posts() {
  const [posts] = useStore((state) => [state.posts])

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <SinglePost
            key={post.id}
            id={post.id}
            content={post.content}
            likes={post.likes}
            owner={post.owner}
            comments={post.comments}
          ></SinglePost>
        ))}
    </div>
  )
}
