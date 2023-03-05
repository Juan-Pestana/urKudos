'use client'
import { useState, useEffect } from 'react'
import { pb } from '../sevices/pocketBase'
import Image from 'next/image'
import { Iuser } from '../types/types'
import Link from 'next/link'

export default function UserImage() {
  const [user, setUser] = useState<any>(null)
  //const

  useEffect(() => {
    const logedIn = pb.authStore.model
    setUser(logedIn)
  }, [])

  return (
    <>
      <nav className="flex items-center gap-6">
        {user ? (
          <>
            <li className="list-none ">
              <Link
                href="/board/main"
                className="border-2 text-xl  border-slate-500 rounded-lg px-6 py-2"
              >
                Board
              </Link>
            </li>
            <li className="list-none object-cover ">
              <Image
                className="rounded-full"
                src={`http://127.0.0.1:8090/api/files/_pb_users_auth_/${user.id}/${user.avatar}`}
                alt="avatar small"
                width={50}
                height={50}
              />
            </li>
          </>
        ) : (
          <>
            <li className="list-none text-xl border-2 border-slate-500 rounded-lg px-6 py-2  ">
              <Link href="/registe">Join</Link>
            </li>
          </>
        )}
      </nav>
    </>
  )
}
