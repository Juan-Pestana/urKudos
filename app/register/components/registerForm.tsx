'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { IsignUp } from '../../../types/types'
import { pb } from '../../../pb/pocketBase'
import { json } from 'stream/consumers'

export default function RegisterForm() {
  const router = useRouter()
  const { handleSubmit, register } = useForm<IsignUp>()

  const onSubmit = async (data: IsignUp) => {
    data.name = data.username
    const formData = new FormData()

    formData.append('username', data.username)
    formData.append('name', data.name)
    formData.append('department', data.department)
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('passwordConfirm', data.passwordConfirm)
    formData.append('avatar', data.avatar[0])

    const record = await pb.collection('users').create(formData)
    console.log(record)
    router.push('/login')
  }
  return (
    <main>
      <form
        className="flex h-screen w-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-base-100 w-96 p-10 shadow-xl">
          <div className="py-5">
            <h2 className="text-center text-2xl">Create an account!</h2>
            <input
              type="text"
              placeholder="Type your username..."
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('username')}
            />
            <input
              type="text"
              placeholder="Type your department"
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('department')}
            />
            <input
              type="email"
              placeholder="Type your email..."
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('email')}
            />
            <input
              type="file"
              placeholder="Type your email..."
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('avatar')}
            />
            <input
              type="password"
              placeholder="Type your password..."
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('password')}
            />
            <input
              type="password"
              placeholder="Confirm password..."
              className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
              {...register('passwordConfirm')}
            />
            <div className=" items-center justify-between">
              <button
                className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-700 p-3 text-white"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            <Link href="/login" className="link">
              Go to login
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}
