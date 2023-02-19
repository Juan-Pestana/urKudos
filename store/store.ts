import { create } from 'zustand'
import produce from 'immer'
import { IsinglePostProps, Icomments } from '../types/types'

export const useStore = create<{
  posts: IsinglePostProps[] | []
  user: any
  addPost: (post: IsinglePostProps) => void
  addComment: (id: string, comment: Icomments) => void
}>((set) => ({
  posts: [],
  user: {},
  addPost: (post) => set((state) => ({ posts: [post, ...state.posts] })),
  addComment: (id, comment) =>
    set(
      produce((state) => {
        const index = state.posts.findIndex(
          (p: IsinglePostProps) => p.id === id
        )
        state.posts[index].comments.push(comment)
      })
    ),
}))

// if (window) {
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
