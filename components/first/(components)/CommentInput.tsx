'use client'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { pb } from '../../../sevices/pocketBase'
import { useStore } from '../../../store/store'
import { Icomments, Iuser } from '../../../types/types'

interface IcommentInputProps {
  postId: string
  isResponse: boolean
  addCommentToPost: (id: string) => void
  setResponding?: React.Dispatch<React.SetStateAction<boolean>>
  commentId?: string
  commentResps?: string[]
}

interface IuserComment {
  comment: string
}

export default function CommentInput({
  postId,
  isResponse,
  addCommentToPost,
  setResponding,
  commentId,
  commentResps,
}: IcommentInputProps) {
  const user = pb.authStore.model

  const { handleSubmit, register, resetField } = useForm<IuserComment>()

  const addComment = useStore((state) => state.addComment)

  const onSubmit = async (data: IuserComment) => {
    try {
      const newCommentData = {
        user: user?.id,
        text: data.comment,
        post: postId,
        isResponse: isResponse,
      }
      const newCommentRes = (await pb
        .collection('comments')
        .create(newCommentData, { expand: 'user' })) as Icomments

      await addCommentToPost(newCommentRes.id)

      resetField('comment')

      if (isResponse && commentId && newCommentRes) {
        let test = []
        if (commentResps) {
          test = (await pb.collection('comments').update(commentId, {
            responses: [...commentResps, newCommentRes.id],
          })) as any
        }

        addComment(postId, newCommentRes, commentId)

        //TO DO change this shit
        if (setResponding) setResponding(false)
      } else {
        addComment(postId, newCommentRes)
      }
    } catch (error) {}

    //addComment(postId, newCommentRes)
  }

  return (
    <>
      <div className="object-cover">
        <Image
          className="rounded-full"
          src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${user?.id}/${user?.avatar}`}
          alt="avatar small"
          width={50}
          height={50}
        />
      </div>
      <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          className={`w-full p-2 rounded-xl bg-slate-500 text-slate-200 `}
          type="text"
          placeholder="what do u think"
          autoFocus={isResponse ? true : false}
          {...register('comment')}
        />
      </form>
    </>
  )
}
