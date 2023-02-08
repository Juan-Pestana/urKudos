'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Ilogin } from '../../../types/types'
import { pb } from '../../../sevices/pocketBase'
import { useStore } from '../../../store/store'
import StoreInitializer from '../../StoreInitializer'

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
      router.push('/first')
    } else {
      console.log('user', user)
      console.log('server', serverData)
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
      {user && <StoreInitializer />}
      <form
        className="flex h-screen w-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-base-100 w-96 p-10 shadow-xl">
          <div className="py-5">
            <h2 className="text-center text-2xl">Welcome back!</h2>
            <input
              type="email"
              placeholder="Type your email..."
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('email')}
            />
            <input
              type="password"
              placeholder="Type your password..."
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('password')}
            />
            <div className="items-center justify-between">
              <button
                className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-700 p-3 text-white"
                type="submit"
              >
                Login
              </button>
            </div>
            <Link href="/register" className="link">
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
