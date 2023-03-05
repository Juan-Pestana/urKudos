'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import Image from 'next/image'
import Picker from '@emoji-mart/react'
import { FaRegSmile } from 'react-icons/fa'
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

  const { handleSubmit, register, resetField, getValues, setValue } =
    useForm<IuserComment>()
  const [emojiData, setEmojiData] = useState<any>(null)
  const [showEmoji, setShowEmoji] = useState<boolean>(false)
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

  const addEmoji = (e: any) => {
    const sym = e.unified.split('_')
    const codeArray: any[] = []
    sym.forEach((el: any) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    const singleValue = getValues('comment')
    setValue('comment', singleValue + emoji)
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
        <div className="relative flex items-center  w-full rounded-xl bg-slate-500 ">
          <input
            className="w-full p-2 text-slate-200 rounded-xl bg-slate-500 outline-none"
            type="text"
            placeholder="what do u think"
            autoFocus={isResponse ? true : false}
            {...register('comment')}
          />
          <span
            className="p-2 text-lg cursor-pointer hover:text-xl"
            onClick={async () => {
              const emojys = (await import('@emoji-mart/data')).default
              setEmojiData(emojys)
              setShowEmoji(!showEmoji)
            }}
          >
            <FaRegSmile />
          </span>
          {showEmoji && (
            <div className="absolute top-[100%] right-2 z-10">
              <Picker
                data={emojiData}
                emojiSize={20}
                theme={'dark'}
                emojiButtonSize={32}
                onEmojiSelect={addEmoji}
                maxFrequentRows={1}
                onClickOutside={() => {
                  setShowEmoji(false)
                }}
              />
            </div>
          )}
        </div>
      </form>
    </>
  )
}
