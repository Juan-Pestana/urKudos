import { cookies } from 'next/headers'
import SinglePost from './SinglePost'
import PocketBase from 'pocketbase'
import { redirect } from 'next/navigation'
import { Suspense } from 'react'
import { useStore } from '../../../store/store'
import { IsinglePostProps } from '../../../types/types'
export const dynamic = 'auto',
  dynamicParams = true,
  revalidate = 0,
  fetchCache = 'auto',
  runtime = 'nodejs'

async function initPocketBase() {
  const pb = new PocketBase('http://127.0.0.1:8090')

  // load the store data from the request cookie string
  const pbauthData = cookies().get('pb_auth')?.value || ''

  await pb.authStore.loadFromCookie(pbauthData)

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

const getComments = async (id: string) => {
  const pb = await initPocketBase()
  const records = await pb.collection('comments').getList(1, 50, {
    filter: `post = "${id}"`,
    expand: 'user',
  })
  return records as any
}

const getPosts = async () => {
  const pb = await initPocketBase()
  const userString = pb.authStore.exportToCookie()

  //console.log(userString)

  const records: any = await pb
    .collection('posts')
    .getFullList(200, { expand: 'image,owner', sort: '-created' })

  // const comments = await getComments(records[0].id)

  // console.log(comments)

  if (!records || !records.length) {
    redirect('/')
  } else {
    const posts = await Promise.all(
      records.map(async (post: any) => {
        const comments = await getComments(post.id)

        return {
          id: post.id,
          owner: {
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

          likes: [2, 3, 4, 5, 6, 7, 8, 10],
          comments: comments.items,
        }
      })
    )
    if (posts) {
      return { posts, userString }
    } else {
      return {
        posts: [],
        userString: userString,
      }
    }
  }
}

export default async function Posts() {
  const { posts, userString } = await getPosts()

  console.log(userString)
  useStore.setState({ posts })

  const storePosts = useStore.getState().posts

  return (
    <div>
      {storePosts &&
        storePosts.map((post) => (
          <SinglePost
            key={post.id}
            id={post.id}
            content={post.content}
            likes={post.likes}
            owner={post.owner}
            comments={post.comments}
          />
        ))}
    </div>
  )
}
