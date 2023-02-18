'use client'
import React from 'react'
import Image from 'next/image'

type IpostUserProps = {
  postOwnerId?: string
  postOwnerImage?: string
  postOwnerName?: string
  postOwnerPosition?: string
}

export default function PostUser({
  postOwnerId,
  postOwnerImage,
  postOwnerName,
  postOwnerPosition,
}: IpostUserProps) {
  return (
    <div className="flex p-2">
      <div className="object-cover">
        {postOwnerImage && (
          <Image
            className="rounded-full"
            src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${postOwnerId}/${postOwnerImage}`}
            alt="avatar"
            width={50}
            height={50}
          />
        )}
      </div>

      <div className="flex flex-col justify-around flex-1 px-5">
        <div>
          <h2 className="text-xl font-bold">{postOwnerName}</h2>
        </div>
        <div>
          <p className="text-lg">{postOwnerPosition}</p>
        </div>
      </div>
      <div className="text-4xl">...</div>
    </div>
  )
}
