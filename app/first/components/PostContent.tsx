import React from 'react'
import Image from 'next/image'

type postContentProps = {
  postText: string
  image: { imgName: string; imgId: string }
}

export default function PostContent({ postText, image }: postContentProps) {
  return (
    <>
      <div className="p-2">{postText}</div>
      <div className="object-cover">
        <Image
          className="w-full"
          src={`http://127.0.0.1:8090/api/files/images/${image.imgId}/${image.imgName}`}
          width={400}
          height={400}
          alt="some Image"
        />
      </div>
    </>
  )
}
