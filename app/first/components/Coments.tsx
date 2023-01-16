import CommentInput from './CommentInput'

import PocketBase from 'pocketbase'
import SingleComment from './SingleComment'
import { Iuser, Icomments } from '../../../types/types'
import LikesComents from './LikesComents'

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs'

const getComments = async (id: string) => {
  const pb = new PocketBase('http://127.0.0.1:8090')
  const records = await pb.collection('comments').getList(1, 50, {
    filter: `post = "${id}"`,
    expand: 'user',
  })
  return records as any
}

const asignResponse = (id: string, comments: Icomments[]) => {
  let aResp = comments.find((comment: any) => {
    return comment.id === id
  })
  //
  if (aResp && aResp.expand) {
    aResp.user = aResp.expand.user
  }

  if (aResp && aResp.responses && aResp.responses.length) {
    aResp.responses = aResp.responses.map((nResp: string) =>
      asignResponse(nResp, comments)
    )
    //console.log(aResp)
    return aResp
  } else {
    return aResp
  }
}

interface commentsProps {
  postId: string
}

export default async function Coments({ postId }: commentsProps) {
  const allComments = await getComments(postId)

  console.log(allComments.items[2])

  const comments = allComments.items.map((comment: any) => ({
    id: comment.id,
    text: comment.text,
    user: comment.expand.user,
    isResponse: comment.isResponse,
    responses:
      comment.responses && comment.responses.length
        ? comment.responses.map((resp: string) =>
            asignResponse(resp, allComments.items)
          )
        : [],
  }))

  console.log(comments[0])

  return (
    <>
      <LikesComents
        postLikes={[9, 8, 7, 5, 2, 1, 7]}
        postCommentsNum={comments.length}
      />
      <div className="border-t-2 border-solid border-slate-500 px-1 py-2">
        {comments
          .filter((comment: Icomments) => !comment.isResponse)
          .map((comment: Icomments) => (
            <div key={comment.id}>
              <SingleComment
                key={comment.id}
                id={comment.id}
                text={comment.text}
                isResponse={comment.isResponse}
                post={comment.post}
                user={comment.user}
                responses={comment.responses}
              />
            </div>
          ))}

        {/* comment imput */}
        <CommentInput />
      </div>
    </>
  )
}
