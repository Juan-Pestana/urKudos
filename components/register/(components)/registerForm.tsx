'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { IsignUp } from '../../../types/types'
import { pb } from '../../../sevices/pocketBase'
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

    router.push('/login')
  }
  return (
    <main>
      <form
        className="flex my-40 w-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="bg-slate-900 p-10 shadow-xl">
          <div className="py-5">
            <h2 className="text-center text-2xl">Create an account!</h2>
            <input
              type="email"
              placeholder="Type your email..."
              className="my-4 block w-full border-2 border-slate-600 bg-slate-500 p-3"
              {...register('email')}
            />
            <div className="flex gap-6">
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Type your username..."
                  className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
                  {...register('username')}
                />

                <input
                  type="password"
                  placeholder="Type your password..."
                  className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
                  {...register('password')}
                />
              </div>
              <div className="flex flex-col">
                <input
                  type="text"
                  placeholder="Type your department"
                  className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
                  {...register('department')}
                />
                <input
                  type="password"
                  placeholder="Confirm password..."
                  className="my-4 w-full max-w-xs border-2 border-slate-600 bg-slate-500 p-3"
                  {...register('passwordConfirm')}
                />
              </div>
            </div>
            <input
              type="file"
              className=" my-4 text-sm text-grey-500 
                  file:mr-5 file:py-2 file:px-6
                  file:border-0
                  file:text-sm file:font-medium
                file:bg-slate-700 file:text-slate-200
                  hover:file:cursor-pointer hover:file:bg-slate-700
                hover:file:text-slate-100 bg-slate-500 w-full h-14 file:h-14"
              {...register('avatar')}
            />
            <div className=" items-center justify-between">
              <button
                className="my-4 w-full border-2 border-slate-600 bg-slate-700 p-3 text-white hover:bg-slate-600"
                type="submit"
              >
                Sign Up
              </button>
            </div>
            Already a User?
            <Link href="/login" className="text-blue-700 ml-3">
              Go to login
            </Link>
          </div>
        </div>
      </form>
    </main>
  )
}
