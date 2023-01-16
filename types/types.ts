export interface Iuser {
  id: string
  name: string
  position: string
  avatar: string
}

export interface Icomments {
  id: string
  text: string
  post: number
  expand?: any
  isResponse: boolean
  user?: Iuser
  responses: Icomments[] | []
}

export interface Ilogin {
  email: string
  password: string
}

export interface IsignUp {
  name?: string
  department: string
  username: string
  email: string
  password: string
  passwordConfirm: string
}
