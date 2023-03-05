import { FaImage, FaVideo, FaLink, FaStar } from 'react-icons/fa'

import { inputType, Iimage } from '../../../../types/types'

interface IinputSelectBtns {
  image: Iimage | null
  video: string
  setInputType: React.Dispatch<React.SetStateAction<inputType>>
}

export default function InputSelectBtns({
  setInputType,
  image,
  video,
}: IinputSelectBtns) {
  return (
    <div className="pb-2 px-2 flex flex-wrap gap-2 ">
      <button
        type="button"
        disabled={video ? true : false}
        onClick={() => setInputType('image')}
        className={`flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4   ${
          video ? ' text-slate-500' : 'hover:bg-slate-500'
        }`}
      >
        <FaImage /> Image
      </button>
      <button
        type="button"
        disabled={image ? true : false}
        onClick={() => setInputType('video')}
        className={`flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4   ${
          image ? ' text-slate-500' : 'hover:bg-slate-500'
        }`}
      >
        <FaVideo /> Video
      </button>
      <button
        type="button"
        onClick={() => setInputType('link')}
        className="flex flex-1 justify-center  rounded-md items-center gap-3 text-xl py-2 px-4  hover:bg-slate-500"
      >
        <FaLink /> Link
      </button>
      <button
        type="button"
        className="flex flex-1 justify-center rounded-md items-center gap-3 text-xl py-2 px-4  text-yellow-500 hover:bg-slate-500"
      >
        <FaStar /> Star
      </button>
    </div>
  )
}
