'use client'

import CommentInput from './CommentInput'

import SingleComment from './SingleComment'
import { Iuser, Icomments } from '../../../types/types'
import LikesComents from './LikesComents'
import { useEffect, useState, useMemo } from 'react'
import { pb } from '../../../sevices/pocketBase'

const asignResponse = (id: string | Icomments, comments: Icomments[]) => {
  let found = comments.find((c) => c.id === id)
  let response: Icomments = {}
  if (found) {
    response.user = found.expand.user
    response.id = found.id
    response.isResponse = found.isResponse
    response.post = found.post
    response.text = found.text
    response.responses = found.responses

    if (response.responses && response.responses.length) {
      response.responses = response.responses.map((res) =>
        asignResponse(res, comments)
      )
    }

    return response
  }
}

// const getComments = async (id: string) => {
//   const records = await pb.collection('comments').getList(1, 50, {
//     filter: `post = "${id}"`,
//     expand: 'user',
//     $autoCancel: false,
//   })
//   return records
// }

export default function Coments({ postId }: any) {
  //const allComments = await getComments(postId)

  const [loading, setLoading] = useState<boolean>(true)
  const [comments, setComments] = useState<Icomments[] | []>([])
  //const [ordComments, setOrdComments] = useState<any[]>()
  const [refetch, setRefetch] = useState<string>('first')

  useEffect(() => {
    console.log('fetching nuevos...')
    getComments(postId)
  }, [refetch])

  let ordComments = useMemo(() => {
    const ord = comments.map((comment: any) => ({
      id: comment.id,
      text: comment.text,
      user: comment.expand.user,
      isResponse: comment.isResponse,
      post: comment.post,
      responses:
        comment.responses && comment.responses.length
          ? comment.responses.map((resp: string) =>
              asignResponse(resp, comments)
            )
          : [],
    }))

    return ord
  }, [comments])

  async function getComments(id: string) {
    setLoading(true)
    try {
      const response = await pb.collection('comments').getList(1, 50, {
        filter: `post = "${id}"`,
        expand: 'user',
        $autoCancel: false,
      })
      if (response.items) {
        setComments(response.items)
        setLoading(false)
      } else {
        console.log('Respuesta de red OK pero respuesta de HTTP no OK')
      }
    } catch (error) {
      console.log('Hubo un problema con la petición Fetch:' + error)
    }
  }

  // comments = comments.map((comment: any) => ({
  //   id: comment.id,
  //   text: comment.text,
  //   user: comment.expand.user,
  //   isResponse: comment.isResponse,
  //   responses:
  //     comment.responses && comment.responses.length
  //       ? comment.responses.map((resp: string) => asignResponse(resp, comments))
  //       : [],
  // }))

  if (loading) {
    return <>Loading....</>
  }

  return (
    <>
      <LikesComents
        postLikes={[9, 8, 7, 5, 2, 1, 7]}
        postCommentsNum={comments && comments.length}
      />
      <div className="border-t-2 border-solid border-slate-500 px-1 py-2">
        {ordComments &&
          ordComments
            .filter((comment: Icomments) => !comment.isResponse)
            .map((comment: Icomments) => (
              <div key={comment.id}>
                <SingleComment
                  key={comment.id}
                  id={comment.id}
                  text={comment.text}
                  expand={comment.expand}
                  isResponse={comment.isResponse}
                  post={comment.post}
                  user={comment.user}
                  responses={comment.responses}
                  setRefetch={setRefetch}
                />
              </div>
            ))}
        <div className="flex gap-2 p-1 items-center border-t-2 border-slate-500 border-solid py-3">
          <CommentInput
            postId={postId}
            isResponse={false}
            setComments={setRefetch}
          />
        </div>
      </div>
    </>
  )
}
