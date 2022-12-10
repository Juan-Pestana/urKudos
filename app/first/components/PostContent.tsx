import React from 'react'
import Image from 'next/image'

export default function PostContent() {
  return (
    <>
      <div className="p-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla tempora
        fugiat expedita deleniti architecto iusto corrupti nam, odit unde!
        Nihil.
      </div>
      <div className="object-cover">
        <Image
          className="w-full"
          src="https://i.pravatar.cc/800"
          width={400}
          height={400}
          alt="some Image"
        />
      </div>
    </>
  )
}
