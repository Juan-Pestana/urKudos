import PocketBase from 'pocketbase'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import StoreInitializer from '../../app/StoreInitializer'
import SinglePost from './SinglePost'
import { useStore } from '../../store/store'
import { IsinglePostProps } from '../../types/types'

async function initPocketBase() {
  const pb = new PocketBase('http://127.0.0.1:8090')

  // load the store data from the request cookie string
  const pbauthData = cookies().get('pb_auth')?.value || ''

  await pb.authStore.loadFromCookie(pbauthData)

  try {
    // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
    pb.authStore.isValid && (await pb.collection('users').authRefresh())
  } catch (_) {
    // clear the auth store on failed refresh

    pb.authStore.clear()
    redirect('/login')
  }

  return pb
}

const getPosts = async (params: { slug: string }, page?: string) => {
  const pb = await initPocketBase()

  let { slug } = params

  const types = [
    'pelis-series',
    'musica',
    'restaurantes-comida',
    'lugares',
    'planes',
    'noticias',
    'star',
  ]

  const intPage = page ? parseInt(page) : 1

  const response: any = await pb.collection('posts').getList(intPage, 5, {
    expand: 'image,owner,comments,comments.user',
    sort: '-created',
    filter: types.includes(slug) ? `type = "${slug}"` : '',
  })

  //console.log(response)

  const records = response.items

  const oldPosts = useStore.getState().posts

  //CUIDADO CON ESTO
  if (!records || !records.length) {
    redirect('/')
  } else {
    const posts = records.map((post: any) => {
      // const comments = await getComments(post.id)

      return {
        id: post.id,
        type: post.type,
        owner: {
          name: post.expand.owner.name,
          avatar: post.expand.owner.avatar,
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
        comments: post.expand.comments || [],
      }
    })

    if (posts) {
      useStore.setState({ posts: [...posts] })
      return { posts, user: pb.authStore.model }
    } else {
      return {
        posts: [],
        user: pb.authStore.model,
      }
    }
  }
}

export default async function Posts({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: { [key: string]: string | undefined }
}) {
  //const posts = useStore.getState().posts
  const page = searchParams?.page

  const { posts, user } = await getPosts(params, page)

  const sStatePosts = useStore.getState().posts

  console.log(
    'esto es del server state ----------------------------->',
    sStatePosts
  )

  return (
    <div>
      <StoreInitializer posts={posts} user={user} />
      {sStatePosts &&
        sStatePosts.map((post: IsinglePostProps, idx: number) => (
          <SinglePost
            key={post.id}
            type={post.type}
            id={post.id}
            content={post.content}
            likes={post.likes}
            owner={post.owner}
            comments={post.comments}
            isLast={idx === posts.length - 1}
          ></SinglePost>
        ))}
    </div>
  )
}
