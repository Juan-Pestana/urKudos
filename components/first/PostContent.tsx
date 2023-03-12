import React from 'react'
import Image from 'next/image'

import { IpostContentProps } from '../../types/types'
import LinkPreview from './shared/LinkPreview'

export default function PostContent({
  text,
  image,
  video,
  link,
}: IpostContentProps) {
  return (
    <>
      <div className="px-2 py-4 text-xl whitespace-pre-line">{text}</div>
      <div className="object-cover">
        {image && (
          <Image
            className="w-full"
            src={`http://127.0.0.1:8090/api/files/images/${image.imgId}/${image.imgName}`}
            width={400}
            height={400}
            alt="some Image"
          />
        )}
        {video && (
          <div className="w-full aspect-video">
            <iframe
              src={video}
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
        )}
        {link && (
          <LinkPreview
            title={link.title}
            url={link.url}
            description={link.description}
            favicon={link.favicon}
            image={link.image}
          />
        )}
      </div>
    </>
  )
}
