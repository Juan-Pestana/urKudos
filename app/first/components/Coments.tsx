import React from 'react'
import Image from 'next/image'
import SingleComment from './SingleComment'
import CommentInput from './CommentInput'
import { comments } from '../data'
import { render } from 'react-dom'

interface Iuser {
  id: string
  userName: string
  position: string
  image: string
}

interface Icomments {
  id: string
  text: string
  post: number
  user?: Iuser
  responses: string[]
}

interface commentsProps {
  postComments: Icomments[]
}

function Coments({ postComments }: commentsProps) {
  let comments = postComments

  return (
    <div className="border-t-2 border-solid border-slate-500 px-1 py-2">
      {comments.map((comment: Icomments) => (
        <div key={comment.id}>
          {/* @ts-expect-error Server Component */}
          <SingleComment
            key={comment.id}
            id={comment.id}
            // text={comment.text}
            // post={comment.post}
            // user={comment.user}
            // responses={comment.responses}
          />
        </div>
      ))}

      {/* another comment */}

      {/* comment imput */}
      <CommentInput />
    </div>
  )
}

export default Coments
