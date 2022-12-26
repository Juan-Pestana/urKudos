import React from 'react'
import Image from 'next/image'

type postContentProps = {
  postText: string
  postImage: string
}

export default function PostContent({ postText, postImage }: postContentProps) {
  return (
    <>
      <div className="p-2">{postText}</div>
      <div className="object-cover">
        <Image
          className="w-full"
          src={postImage}
          width={400}
          height={400}
          alt="some Image"
        />
      </div>
    </>
  )
}
