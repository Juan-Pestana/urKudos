'use client'

import Image from 'next/image'
import { Icomments } from '../../../types/types'

export default function SingleComment(comment: Icomments) {
  return (
    // if is response comment add ml-16
    <>
      <div className="flex gap-2 p-1 mb-2">
        <div className="object-cover ">
          {comment.user?.avatar && (
            <Image
              className="rounded-full"
              src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${comment.user.id}/${comment.user.avatar}`}
              alt="avatar small"
              //style={{ width: '100%', height: '100%' }}
              width={50}
              height={50}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="bg-slate-500 rounded-2xl p-2">
            <h5 className="text-base font-bold text-slate-200">
              {comment.user?.name}
            </h5>
            <p className="text-slate-200">{comment.text}</p>
          </div>
          <div className="px-3 flex justify-between">
            <span className="text-slate-400">responder</span>
            {comment.responses && comment.responses.length ? (
              <span className="text-slate-400">
                {comment.responses.length} respuestas
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {comment.responses && comment.responses.length
        ? comment.responses.map((response: Icomments) => (
            <div key={response.id} className="ml-10">
              <SingleComment
                id={response.id}
                text={response.text}
                expand={response.expand}
                isResponse={response.isResponse}
                user={response.user}
                post={response.post}
                responses={response.responses}
              />
            </div>
          ))
        : null}
    </>
  )
}
