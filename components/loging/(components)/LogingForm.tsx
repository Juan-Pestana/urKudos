'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Ilogin } from '../../../types/types'
import { pb } from '../../../sevices/pocketBase'
import { useStore } from '../../../store/store'

function LogingForm() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<Ilogin>()

  let user = undefined

  const onSubmit = async (data: Ilogin) => {
    user = await pb
      .collection('users')
      .authWithPassword(data.email, data.password)

    const serverData = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ authString: pb.authStore.exportToCookie() }),
    })

    if (user.record && serverData.ok) {
      useStore.setState({ user: pb.authStore.model })
      router.push('/board/main')
    } else {
      alert('Credential is not valid')
    }
  }

  const logOut = async () => {
    pb.authStore.clear()
    const result = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    })
    if (result.ok) {
      console.log('logged out')
    }
  }

  return (
    <main>
      <form
        className="flex my-40 w-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-slate-900 m-2 p-10 shadow-x  lg:w-1/3 xl:w-1/4  ">
          <div className="py-5">
            <h2 className="text-center text-2xl">Welcome back!</h2>
            <input
              type="email"
              placeholder="Type your email..."
              className="my-4 w-full  border-2 border-slate-600 bg-slate-500 p-3"
              {...register('email')}
            />
            <input
              type="password"
              placeholder="Type your password..."
              className="my-4 w-full  border-2 border-slate-600 bg-slate-500 p-3"
              {...register('password')}
            />
            <div className="items-center justify-between">
              <button
                className="my-4 w-full border-2 border-slate-600 bg-slate-700 p-3 text-white hover:bg-slate-600 "
                type="submit"
              >
                Login
              </button>
            </div>
            Not a User?
            <Link href="/register" className="text-blue-700 mx-3">
              Go to sign up
            </Link>
          </div>
        </div>
      </form>
      <button
        onClick={logOut}
        className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-700 p-3 text-white"
        type="submit"
      >
        LogOut
      </button>
    </main>
  )
}

export default LogingForm
