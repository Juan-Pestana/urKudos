import React from 'react'
import Image from 'next/image'

export default function CommentInput() {
  return (
    <div className="flex gap-2 p-1 items-center border-t-2 border-slate-500 border-solid py-3">
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
    </div>
  )
}
