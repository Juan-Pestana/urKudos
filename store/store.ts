import { create } from 'zustand'
import { IsinglePostProps } from '../types/types'

export const useStore = create<{
  posts: IsinglePostProps[] | []
  user: any
}>((set) => ({
  posts: [],
  user: {},
}))
