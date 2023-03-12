'use client'
import { pb } from '../../../sevices/pocketBase'
import { useRef, useState, useTransition } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'

import Picker from '@emoji-mart/react'
import InputSelectBtns from './postInput/InputSelectBtns'

import { FaRegSmile, FaShare } from 'react-icons/fa'

import { Ilink, Iimage, inputType, Iuser } from '../../../types/types'
import LinkPreview from './shared/LinkPreview'
import { useStore } from '../../../store/store'

export default function PostInput() {
  const [inputType, setInputType] = useState<inputType>('')
  const [link, setLink] = useState<Ilink>()
  const [image, setImage] = useState<Iimage | null>(null)
  const [video, setVideo] = useState('')
  const [emojiData, setEmojiData] = useState<any>(null)
  const [showEmoji, setShowEmoji] = useState<boolean>(false)
  const textRef = useRef<HTMLTextAreaElement>(null)
  const router = useRouter()

  const user = useStore((state) => state.user)

  const [isPending, startTransition] = useTransition()
  const path = usePathname()?.split('/').at(-1)

  const pbUser = pb.authStore.model

  const types = [
    'pelis-series',
    'musica',
    'restaurantes-comida',
    'lugares',
    'planes',
    'noticias',
    'star',
  ]

  var type: undefined | string = undefined

  if (path && types.includes(path)) {
    type = path
  }

  const addPost = useStore((state) => state.addPost)
  //????

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
    if (e.target.files) {
      const formData = new FormData()
      formData.append('image', e.target.files[0])
      const imageData = await pb.collection('images').create(formData)
      setImage({ imgId: imageData.id, imgName: imageData.image })
    }
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const data = {
      owner: pbUser?.id,
      text: textRef.current ? textRef.current.value : undefined,
      link,
      image: image?.imgId,
      video,
      type,
    }

    if (data.text || data.link || data.image || data.video) {
      const record = await pb.collection('posts').create(data)
      setImage(null)
      setLink(undefined)
      setVideo('')
      if (textRef.current) {
        textRef.current.value = ''
      }

      const newRecord = {
        id: record.id,
        type: type,
        content: {
          text: record.text,
          image: record.content,
          video: record.video,
          link: record.link,
        },
        likes: [],
        owner: {
          id: pb.authStore.model?.id,
          name: pb.authStore.model?.name,
          position: pb.authStore.model?.position,
          avatar: pb.authStore.model?.avatar.avatar,
        },
        comments: [],
      }

      startTransition(() => {
        // Refresh the current route and fetch new data from the server without
        // losing client-side browser or React state.
        router.refresh()
      })
      setInputType('')

      addPost(newRecord)
    } else {
      console.log('aquí no envio')
    }
  }

  if (type === 'noticias' || type === 'star') {
    return null
  }

  const addEmoji = (e: any) => {
    const sym = e.unified.split('_')
    const codeArray: any[] = []
    sym.forEach((el: any) => codeArray.push('0x' + el))
    let emoji = String.fromCodePoint(...codeArray)
    textRef.current
      ? (textRef.current.value = textRef.current.value + emoji)
      : null
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border-2 border-slate-500 border-solid rounded-lg"
      >
        <div className="flex gap-2 p-3 items-center ">
          {user ? (
            <div className="object-cover">
              <Image
                className="rounded-full"
                src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${user.id}/${user.avatar}`}
                alt="avatar small"
                width={70}
                height={70}
              />
            </div>
          ) : (
            <div className="w-16 h-16"></div>
          )}

          <div className="w-full flex gap-2 items-center relative">
            <div className="flex items-center rounded-xl bg-slate-500 flex-1">
              <textarea
                ref={textRef}
                className="rounded-xl bg-slate-500 p-2 flex-1 h-14 overflow-auto scrollbar-hide outline-none"
                placeholder="what do u think"
              />

              <span
                className="p-2 text-lg cursor-pointer hover:text-xl"
                onClick={async () => {
                  const emojys = (await import('@emoji-mart/data')).default
                  setEmojiData(emojys)
                  setShowEmoji(!showEmoji)
                }}
              >
                <FaRegSmile />
              </span>
            </div>

            <button
              className="flex items-center justify-center rounded-full bg-blue-500 p-3 w-12 h-12"
              type="submit"
            >
              <FaShare />
            </button>
            {showEmoji && (
              <div className="absolute top-[100%] right-2 z-10">
                <Picker
                  data={emojiData}
                  emojiSize={20}
                  theme={'dark'}
                  emojiButtonSize={32}
                  onEmojiSelect={addEmoji}
                  maxFrequentRows={1}
                  onClickOutside={() => {
                    setShowEmoji(false)
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <div>
          {/* btns */}
          <InputSelectBtns
            setInputType={setInputType}
            image={image}
            video={video}
          />
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
                hover:file:text-slate-100 bg-slate-500 w-full h-14 file:h-14"
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
                  value={video}
                />
              </label>
            </div>
          )}
        </div>
        {/* previews*/}
        <div>
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
            <LinkPreview
              title={link.title}
              url={link.url}
              description={link.description}
              favicon={link.favicon}
              image={link.image}
            />
          )}
        </div>
      </form>
    </>
  )
}
