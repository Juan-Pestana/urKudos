'use client'
import { pb } from '../../../pb/pocketBase'
import { useState } from 'react'
import Image from 'next/image'
import {
  FaImage,
  FaVideo,
  FaLink,
  FaStar,
  FaFile,
  FaShare,
} from 'react-icons/fa'
import { Ilink, Iimage } from '../../../types/types'

type inputType = 'image' | 'link' | 'video' | ''

export default function PostInput() {
  const [inputType, setInputType] = useState<inputType>('')
  const [link, setLink] = useState<Ilink>()
  const [image, setImage] = useState<Iimage>()
  const [text, setText] = useState('')
  const [video, setVideo] = useState('')

  const handleLinkchange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (e.target.value.includes('https://')) {
      const data = await fetch(
        `https://link-preview-green.vercel.app/api/link-preview?url=${e.target.value}`,
        {
          method: 'GET',
        }
      )
      const linkData = await data.json()

      if (linkData.success) {
        console.log(linkData)
        const alink: Ilink = linkData.result.siteData
        setLink({
          ...alink,
        })
      }
    }
  }

  const handleVideochange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.value.includes('https://www.youtube.com')) {
      let embVideo = e.target.value.replace('watch?v=', 'embed/')
      setVideo(embVideo)
    }
  }

  const handleImagechange: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    //console.log(e.target.value)

    if (e.target.files) {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      const imageData = await pb.collection('images').create(formData)
      setImage({ imgId: imageData.id, imgName: imageData.image })
    }
  }

  return (
    <>
      <div className="border-2 border-slate-500 border-solid rounded-lg">
        <div className="flex gap-2 p-3 items-center ">
          <div className="object-cover">
            <Image
              className="rounded-full"
              src="https://i.pravatar.cc/100"
              alt="avatar small"
              width={70}
              height={70}
            />
          </div>
          <form className="w-full flex gap-2 items-center">
            <textarea
              className="w-full p-2 rounded-xl bg-slate-500 flex-1 h-14 overflow-auto scrollbar-hide"
              placeholder="what do u think"
            />
            <button
              className={`${
                !focus ? 'hidden' : 'flex'
              } items-center justify-center rounded-full bg-blue-500 p-3 w-12 h-12 `}
              type="submit"
            >
              <FaShare />
            </button>
          </form>
        </div>
        <div>
          <div className="flex gap-2 ">
            <button
              onClick={() => setInputType('image')}
              className="flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4  hover:bg-slate-500"
            >
              <FaImage /> Image
            </button>
            <button
              onClick={() => setInputType('video')}
              className="flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4  hover:bg-slate-500"
            >
              <FaVideo /> Video
            </button>
            <button
              onClick={() => setInputType('link')}
              className="flex flex-1 justify-center  rounded-md items-center gap-3 text-xl py-2 px-4  hover:bg-slate-500"
            >
              <FaLink /> Link
            </button>
            <button className="flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4  text-yellow-500 hover:bg-slate-500">
              <FaStar /> Star
            </button>
          </div>
          {inputType === 'image' && (
            <div className="p-2">
              <label>
                <input
                  onChange={handleImagechange}
                  type="file"
                  className="text-sm text-grey-500 rounded-lg
            file:mr-5 file:py-2 file:px-6
            file:border-0
            file:text-sm file:font-medium
            file:bg-slate-900 file:text-slate-200
            hover:file:cursor-pointer hover:file:bg-slate-700
            hover:file:text-slate-100 bg-slate-500 w-full h-14 file:h-14
          "
                />
              </label>
            </div>
          )}
          {inputType === 'link' && (
            <div className="p-2">
              <label>
                <input
                  onChange={handleLinkchange}
                  type="text"
                  className=" text-grey-500 rounded-lg p-3
             bg-slate-500 w-full h-14 text-lg"
                  placeholder="https://"
                />
              </label>
            </div>
          )}
          {inputType === 'video' && (
            <div className="p-2">
              <label>
                <input
                  onChange={handleVideochange}
                  type="text"
                  className=" text-grey-500 rounded-lg p-3
             bg-slate-500 w-full h-14 text-lg"
                  placeholder="https://www.youtube.com/watch?..."
                />
              </label>
            </div>
          )}
        </div>
        {/* previews*/}
        <div className="p-2">
          {image && (
            <div className="object-cover">
              <Image
                className="w-full"
                src={`http://127.0.0.1:8090/api/files/images/${image.imgId}/${image.imgName}`}
                alt="something"
                width="300"
                height="300"
              />
            </div>
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
            <a href={link.url} target="_blank" rel="noreferrer">
              <div className="flex gap-2 bg-slate-700">
                <div
                  className={
                    link.image
                      ? 'object-cover w-1/4 h-full'
                      : 'w-1/5 flex items-center justify-center bg-slate-600'
                  }
                >
                  <img
                    src={link.image ? link.image : link.favicon}
                    alt={link.title}
                    className={link.image ? 'w-full' : 'w-12'}
                  />
                </div>
                <div className="w-3/4 p-3">
                  <h1 className="overflow-hidden whitespace-nowrap text-ellipsis mb-4">
                    {link.title}
                  </h1>
                  <p>{link.description}</p>
                </div>
              </div>
            </a>
          )}
        </div>
      </div>
    </>
  )
}
