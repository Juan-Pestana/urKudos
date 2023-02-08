'use client'
import Image from 'next/image'

interface IcommentInputProps {
  postId: string
  isResponse: boolean
}

export default function CommentInput({
  postId,
  isResponse,
}: IcommentInputProps) {
  return (
    <>
      <div className="object-cover">
        <Image
          className="rounded-full"
          src="https://i.pravatar.cc/100"
          alt="avatar small"
          width={70}
          height={70}
        />
      </div>
      <form className="w-full">
        <input
          className="w-full p-2 rounded-xl bg-slate-500"
          type="text"
          placeholder="what do u think"
        />
      </form>
    </>
  )
}
