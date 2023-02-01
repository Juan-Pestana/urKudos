import { cookies } from 'next/headers'
import SinglePost from './SinglePost'

import PocketBase from 'pocketbase'
import { redirect } from 'next/navigation'
export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs'

async function initPocketBase() {
  const pb = new PocketBase('http://127.0.0.1:8090')

  // load the store data from the request cookie string
  const pbauthData = cookies().get('pb_auth')?.value || ''
  //console.log(pbauthData)

  await pb.authStore.loadFromCookie(`pb_auth=${pbauthData}`)

  // send back the default 'pb_auth' cookie to the client with the latest store state
  // pb.authStore.onChange(() => {
  //   cookies().set('pb_auth', pb.authStore.exportToCookie())

  // })

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh())
  } catch (_) {
    // clear the auth store on failed refresh

    pb.authStore.clear()
  }

  return pb
}

const getPosts = async () => {
  const pb = await initPocketBase()

  const records = await pb
    .collection('posts')
    .getFullList(200, { expand: 'image,owner' })

  if (!records || !records.length) {
    redirect('/')
  }
  return records as any[]
}

export default async function Posts() {
  const apiPosts = await getPosts()

  const posts = apiPosts.map((post) => ({
    id: post.id,
    user: {
      userName: post.expand.owner.name,
      image: post.expand.owner.avatar,
      position: post.expand.owner.department,
      id: post.expand.owner.id,
    },
    content: {
      text: post.text,
      image: post.expand.image
        ? {
            imgName: post.expand.image.image,
            imgId: post.expand.image.id,
          }
        : undefined,
      video: post.video,
      link: post.link,
    },

    likes: [2, 3, 4, 5, 6, 7, 8, 9, 10],
    comments: post.comments,
  }))

  return (
    <div>
      {posts.map((post) => (
        <SinglePost
          key={post.id}
          id={post.id}
          content={post.content}
          likes={post.likes}
          owner={post.user}
          comments={post.comments}
        />
      ))}
    </div>
  )
}
