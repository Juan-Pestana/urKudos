'use client'

import Image from 'next/image'
import { FaReply } from 'react-icons/fa'
import { useState } from 'react'
import { Icomments } from '../../../types/types'
import { motion, AnimatePresence } from 'framer-motion'

import CommentInput from './CommentInput'
import { pb } from '../../../sevices/pocketBase'

// interface IcommentsProps extends Icomments {
//   addCommentToPost: (id: string) => void
// }

const usr = pb.authStore.model

const user = {
  id: usr?.id,
  name: usr?.name,
  position: usr?.department,
  avatar: usr?.avatar,
}

export function SingleComment(comment: Icomments): JSX.Element {
  const [responding, setResponding] = useState<boolean>(false)
  return (
    // if is response comment add ml-16

    <>
      <div className="flex gap-2 p-1 mb-2 items-center">
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
          <div>
            <h5 className="mx-2 text-base font-bold text-slate-200">
              {comment.user?.name}
            </h5>
            <div className="bg-slate-500 rounded-2xl p-2 flex items-center">
              <p className="text-slate-200 px-2">{comment.text}</p>
              <div
                className="ml-auto px-2 cursor-pointer text-slate-400"
                onClick={() => setResponding(!responding)}
              >
                <FaReply />
              </div>
            </div>
          </div>
          <div className="px-3 flex justify-between">
            {comment.responses && comment.responses.length ? (
              <span className="text-slate-400">
                {comment.responses.length} respuestas
              </span>
            ) : null}
          </div>
        </div>
      </div>
      {responding && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`flex gap-2 p-1 items-center border-l-4 border-yellow-500 border-solid py-5 ml-16 bg-slate-900 px-2 rounded-xl mb-3`}
          >
            <CommentInput
              postId={comment.post}
              isResponse={true}
              commentId={comment.id}
              commentResps={comment.responses?.map((res) => res.id)}
              setResponding={setResponding}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {comment.responses && comment.responses.length
        ? comment.responses.map((response: Icomments) => (
            <div key={response.id} className="ml-10">
              <SingleComment
                key={response.text}
                id={response.id}
                created={response.created}
                // addCommentToPost={comment.addCommentToPost}
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
