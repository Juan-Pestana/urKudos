import React, { Component } from 'react'
import Image from 'next/image'
import SinglePost from './SinglePost'

import PocketBase from 'pocketbase'

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs'

const getPosts = async () => {
  const pb = new PocketBase('http://127.0.0.1:8090')
  const records = await pb
    .collection('posts')
    .getFullList(200, { expand: 'image,owner' })
  return records as any[]
}

//console.log(getPosts())

export default async function Posts() {
  const apiPosts = await getPosts()

  const posts = apiPosts.map((post) => ({
    id: post.id,
    user: {
      userName: post.expand.owner.name,
      image: post.expand.owner.avatar,
      position: post.expand.owner.department,
      id: post.expand.owner.id,
    },
    text: post.text,
    image: { imgName: post.expand.image.image, imgId: post.expand.image.id },
    likes: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    comments: post.comments,
  }))

  return (
    <div>
      {posts.map((post) => (
        <SinglePost
          key={post.id}
          id={post.id}
          text={post.text}
          image={post.image}
          likes={post.likes}
          owner={post.user}
          comments={post.comments}
        />
      ))}
    </div>
  )
}
