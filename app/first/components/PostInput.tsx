'use client'
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

type inputType = 'file' | 'link' | ''

export default function PostInput() {
  const [inputType, setInputType] = useState<inputType>('')

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
              onClick={() => setInputType('file')}
              className="flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4  hover:bg-slate-500"
            >
              <FaImage /> Image
            </button>
            <button className="flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4  hover:bg-slate-500">
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
          {inputType === 'file' && (
            <div className="p-2">
              <label>
                <input
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
                  type="text"
                  className=" text-grey-500 rounded-lg p-3
             bg-slate-500 w-full h-14 text-lg"
                  placeholder="https://"
                />
              </label>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
