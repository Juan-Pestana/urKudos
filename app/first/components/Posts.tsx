import React from 'react'
import Image from 'next/image'
import SinglePost from './SinglePost'

import { posts, users, comments } from '../data'

interface Iuser {
  id: number
  userName: string
  position: string
  image: string
}

interface Ipost {
  id: number
  owner: number
  text: string
  image: string
  likes: number[]
}

interface Icomments {
  id: number
  text: string
  post: number
  user: number
  parent?: number
}

export default function Posts() {
  const initialPosts: Ipost[] = posts
  const initialComments: Icomments[] = comments
  const initialUsers: Iuser[] = users

  //console.log(initialUsers.find((user) => user.id === 2))

  let losPost = initialPosts.map((post) => {
    //console.log(post.owner)

    return {
      ...post,
      owner: initialUsers.find((user) => user.id === post.owner),
      someComments: initialComments
        .filter((comment) => comment.id === post.id)
        .map((comment) => {
          return {
            ...comment,
            user: users.find((user) => comment.user === user.id),
          }
        }),
    }
  })

  return (
    <div>
      {losPost.map((post) => (
        <SinglePost
          key={post.id}
          id={post.id}
          text={post.text}
          image={post.image}
          likes={post.likes}
          owner={post.owner}
          comments={post.someComments}
        />
      ))}
    </div>
  )
}
