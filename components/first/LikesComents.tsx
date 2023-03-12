'use client'

import { useStore } from '../../store/store'

type LikesComentsProps = {
  postLikes: number[]
  postId: string
}

export default function LikesComents({ postLikes, postId }: LikesComentsProps) {
  //console.log(postCommentsNum)

  const comments = useStore(
    (state) => state.posts.find((pt) => pt.id === postId)?.comments
  )

  return (
    <>
      <div className="flex py-4 px-2 text-slate-400">
        <div>
          <span>{postLikes.length}</span> Likes
        </div>
        <div className="flex-1 text-right text-slate-400">
          <span>{comments?.length}</span> Comentarios
        </div>
      </div>
      {/* Coments & Like buttons */}
      <div className="flex border-t-2 border-solid border-slate-500 p-1">
        <div className="flex-1">
          <button className="w-full py-4 rounded-lg text-slate-400 hover:bg-slate-500 hover:text-slate-200">
            Me Gusta
          </button>
        </div>
        <div className="flex-1">
          <button className="w-full py-4 rounded-lg text-slate-400 hover:bg-slate-500 hover:text-slate-200 ">
            Comentar
          </button>
        </div>
      </div>
    </>
  )
}
