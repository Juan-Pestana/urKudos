import { create } from 'zustand'
import dynamic from 'next/dynamic'
import produce from 'immer'
import { IsinglePostProps, Icomments, Iuser } from '../types/types'
import { FaImage, FaVideo, FaLink, FaStar, FaFilm } from 'react-icons/fa'

export const useStore = create<{
  posts: IsinglePostProps[] | []
  user: Iuser | null

  addPost: (post: IsinglePostProps) => void
  addComment: (id: string, comment: Icomments, updCommId?: string) => void
}>((set, get) => ({
  posts: [],
  user: null,

  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addComment: (id, comment, updCommId) =>
    set(
      produce((state) => {
        const index = state.posts.findIndex(
          (p: IsinglePostProps) => p.id === id
        )
        if (updCommId) {
          const updIndex = state.posts[index].comments.findIndex(
            (c: Icomments) => c.id === updCommId
          )
          state.posts[index].comments[updIndex].responses.push(comment.id)
        }
        state.posts[index].comments.push(comment)
      })
    ),
}))

// if (typeof window != undefined) {
//   //@ts-expect-error
//   const connection = window.__REDUX_DEVTOOLS_EXTENSION__?.connect({
//     name: 'Posts State',
//   })
//   connection?.init(useStore.getState())

//   let isUpdateFromDevtools = false
//   connection?.subscribe((evt: any) => {
//     if (evt.type === 'DISPATCH') {
//       const newState = JSON.parse(evt.state)
//       isUpdateFromDevtools = true
//       useStore.setState(newState)
//       isUpdateFromDevtools = false
//     }
//   })

//   useStore.subscribe((newState) => {
//     if (!isUpdateFromDevtools) {
//       connection?.send('State', newState)
//     }
//   })
// }
