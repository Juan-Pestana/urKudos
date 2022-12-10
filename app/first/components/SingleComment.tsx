import React from 'react'
import Image from 'next/image'

export default function SingleComment() {
  return (
    // if is response comment add ml-16
    <div className="flex gap-2 p-1">
      <div className="object-cover">
        <Image
          className="rounded-full"
          src="https://i.pravatar.cc/100"
          alt="avatar small"
          width={70}
          height={70}
        />
      </div>
      <div>
        <div className="bg-slate-500 rounded-2xl p-2">
          <h5 className="text-base font-bold text-slate-200">Comment name</h5>
          <p className="text-slate-200">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            nam temporibus neque corporis beatae voluptatibus !
          </p>
        </div>
        <div className="px-3">
          <span className="text-slate-400">responder</span>
        </div>
      </div>
    </div>
  )
}
