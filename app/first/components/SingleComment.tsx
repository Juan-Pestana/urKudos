import React from 'react'
import Image from 'next/image'
import PocketBase from 'pocketbase'

export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs'

const getComment = async (id: any) => {
  const pb = new PocketBase('http://127.0.0.1:8090')
  const records = await pb.collection('comments').getOne(id, { expand: 'user' })
  return records as any
}

interface Icomments {
  id: string
  // text: string
  // post: number
  // user?: Iuser
  // responses: string[]
}

export default async function SingleComment(commentId: Icomments) {
  const comment = await getComment(commentId.id)
  console.log(comment)

  return (
    // if is response comment add ml-16
    <>
      <div className="flex gap-2 p-1 mb-2">
        <div className="object-cover">
          {comment.expand.user.avatar && (
            <Image
              className="rounded-full"
              src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${comment.expand.user.id}/${comment.expand.user.avatar}`}
              alt="avatar small"
              width={70}
              height={70}
            />
          )}
        </div>
        <div>
          <div className="bg-slate-500 rounded-2xl p-2">
            <h5 className="text-base font-bold text-slate-200">
              {comment.expand.user.name}
            </h5>
            <p className="text-slate-200">{comment.text}</p>
          </div>
          <div className="px-3">
            <span className="text-slate-400">responder</span>
          </div>
        </div>
      </div>
      {comment.responses?.length
        ? comment.responses?.map((child: string) => (
            <div key={child} className="ml-16">
              {/* @ts-expect-error Server Component */}
              <SingleComment key={child} id={child} />
            </div>
          ))
        : null}
    </>
  )
}
