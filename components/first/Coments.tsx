'use client'

import CommentInput from './CommentInput'

import { SingleComment } from './SingleComment'
import { Iuser, Icomments } from '../../types/types'
import LikesComents from './LikesComents'
import { useEffect, useState } from 'react'
import { pb } from '../../sevices/pocketBase'
import { useStore } from '../../store/store'

const asignResponse = (id: string | Icomments, comments: Icomments[]) => {
  let found = comments.find((c) => c.id === id)
  let response: any = {}
  if (found) {
    response.user = found.expand.user
    response.created = found.created
    response.id = found.id
    response.isResponse = found.isResponse
    response.post = found.post
    response.text = found.text
    response.responses = found.responses

    if (response.responses && response.responses.length) {
      response.responses = response.responses
        .map((res: string) => asignResponse(res, comments))
        .sort(function (a: Icomments, b: Icomments) {
          return new Date(b.created).valueOf() - new Date(a.created).valueOf()
        })
    }

    return response
  }
}

export default function Coments({ postId }: any) {
  //const allComments = await getComments(postId)

  //const [comments, setComments] = useState<Icomments[] | []>([])
  const [ordComments, setOrdComments] = useState<any[]>()

  const comments = useStore(
    (state) => state.posts.find((pt) => pt.id === postId)?.comments
  )

  useEffect(() => {
    if (comments) {
      const ord = comments
        .filter((c) => !c.isResponse)
        .map((comment: any) => ({
          id: comment.id,
          text: comment.text,
          created: comment.created,
          user: comment.expand.user,
          isResponse: comment.isResponse,
          post: comment.post,
          responses:
            comment.responses && comment.responses.length
              ? comment.responses
                  .map((resp: string) => asignResponse(resp, comments))
                  .sort(function (a: any, b: any) {
                    return (
                      new Date(b.created).valueOf() -
                      new Date(a.created).valueOf()
                    )
                  })
              : [],
        }))
        .sort(function (a: any, b: any) {
          return new Date(b.created).valueOf() - new Date(a.created).valueOf()
        })
      setOrdComments(ord)
    }
  }, [comments])

  return (
    <>
      {ordComments &&
        ordComments
          .filter((comment: Icomments) => !comment.isResponse)
          .map((comment: Icomments) => (
            <div key={comment.id}>
              <SingleComment
                key={comment.id}
                id={comment.id}
                created={comment.created}
                text={comment.text}
                expand={comment.expand}
                isResponse={comment.isResponse}
                post={comment.post}
                user={comment.user}
                //addCommentToPost={addCommentToPost}
                responses={comment.responses}
              />
            </div>
          ))}
    </>
  )
}
