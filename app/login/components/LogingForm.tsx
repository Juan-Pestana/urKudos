'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Ilogin } from '../../../types/types'
import { pb } from '../../../pb/pocketBase'

function LogingForm() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<Ilogin>()

  const onSubmit = async (data: Ilogin) => {
    const authData = await pb
      .collection('users')
      .authWithPassword(data.email, data.password)

    router.push('/first')
  }

  return (
    <main>
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
    </main>
  )
}

export default LogingForm
