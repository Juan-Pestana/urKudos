import React from 'react'

export default function LikesComents() {
  return (
    <>
      <div className="flex py-4 px-2 text-slate-400">
        <div>
          <span>230</span> Likes
        </div>
        <div className="flex-1 text-right text-slate-400">
          <span>5</span>Comentarios
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
