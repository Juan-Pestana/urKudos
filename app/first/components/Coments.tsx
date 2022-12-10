import React from 'react'
import Image from 'next/image'
import SingleComment from './SingleComment'
import CommentInput from './CommentInput'

function Coments() {
  return (
    <div className="border-t-2 border-solid border-slate-500 px-1 py-2">
      {/* coment */}
      <SingleComment />
      {/* another comment */}

      {/* comment imput */}
      <CommentInput />
    </div>
  )
}

export default Coments
