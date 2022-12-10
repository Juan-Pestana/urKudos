import React from 'react'
import Image from 'next/image'

export default function PostUser() {
  return (
    <div className="flex p-2">
      <div className="object-cover">
        <Image
          className="rounded-full"
          src="https://i.pravatar.cc/100"
          alt="avatar"
          width={50}
          height={50}
        />
      </div>

      <div className="flex flex-col justify-around flex-1 px-5">
        <div>
          <h2 className="text-xl font-bold">Some name</h2>
        </div>
        <div>
          <p className="text-lg">some description</p>
        </div>
      </div>
      <div className="text-4xl">...</div>
    </div>
  )
}
