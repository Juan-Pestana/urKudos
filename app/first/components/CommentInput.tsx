'use client'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import Image from 'next/image'
import { pb } from '../../../sevices/pocketBase'
import { useStore } from '../../../store/store'
import { Icomments, Iuser } from '../../../types/types'

interface IcommentInputProps {
  postId: string
  isResponse: boolean
  setComments: React.Dispatch<React.SetStateAction<[] | Icomments[]>>
}

interface IuserComment {
  comment: string
}

export default function CommentInput({
  postId,
  isResponse,
  setComments,
}: IcommentInputProps) {
  const user = pb.authStore.model
  const [isPending, startTransition] = useTransition()

  const [addComment] = useStore((state) => [state.addComment])
  const { handleSubmit, register, resetField } = useForm<IuserComment>()

  const onSubmit = async (data: IuserComment) => {
    const newCommentData = {
      user: user?.id,
      text: data.comment,
      post: postId,
      isResponse: isResponse,
    }
    const newCommentRes = (await pb
      .collection('comments')
      .create(newCommentData, { expand: 'user' })) as Icomments

    // Refresh the current route and fetch new data from the server without
    // losing client-side browser or React state.
    resetField('comment')

    console.log(newCommentRes)
    setComments((prevComments) => [...prevComments, newCommentRes])
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
          className={`w-full p-2 rounded-xl bg-slate-500 ${
            !isPending ? 'opacity-70' : 'opacity-100'
          }`}
          type="text"
          placeholder="what do u think"
          {...register('comment')}
        />
      </form>
    </>
  )
}
