import SinglePost from './SinglePost'
import { useStore } from '../../../store/store'

export default function Posts() {
  const posts = useStore.getState().posts

  return (
    <div>
      {posts &&
        posts.map((post) => (
          <SinglePost
            key={post.id}
            type={post.type}
            id={post.id}
            content={post.content}
            likes={post.likes}
            owner={post.owner}
            comments={post.comments}
            isLast={false}
          ></SinglePost>
        ))}
    </div>
  )
}
