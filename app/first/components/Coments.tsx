import CommentInput from './CommentInput'

import SingleComment from './SingleComment'
import { Iuser, Icomments } from '../../../types/types'
import LikesComents from './LikesComents'

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

export default function Coments({ comments, postId }: any) {
  //const allComments = await getComments(postId)

  comments = comments.map((comment: any) => ({
    id: comment.id,
    text: comment.text,
    user: comment.expand.user,
    isResponse: comment.isResponse,
    responses:
      comment.responses && comment.responses.length
        ? comment.responses.map((resp: string) => asignResponse(resp, comments))
        : [],
  }))

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
                expand={comment.expand}
                isResponse={comment.isResponse}
                post={comment.post}
                user={comment.user}
                responses={comment.responses}
              />
            </div>
          ))}
        <div className="flex gap-2 p-1 items-center border-t-2 border-slate-500 border-solid py-3">
          <CommentInput postId={postId} isResponse={false} />
        </div>
      </div>
    </>
  )
}
