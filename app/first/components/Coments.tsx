import CommentInput from './CommentInput'

import SingleComment from './SingleComment'
import { Iuser, Icomments } from '../../../types/types'
import LikesComents from './LikesComents'

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

export default async function Coments({ comments }: any) {
  //const allComments = await getComments(postId)
  const postId = comments[0]

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
                isResponse={comment.isResponse}
                post={comment.post}
                user={comment.user}
                responses={comment.responses}
              />
            </div>
          ))}
        <div className="flex gap-2 p-1 items-center border-t-2 border-slate-500 border-solid py-3">
          {<CommentInput postId={postId} isResponse={false} />}
        </div>
      </div>
    </>
  )
}
