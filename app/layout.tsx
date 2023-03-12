import './output.css'
import { Montserrat, Roboto, Inter } from 'next/font/google'
import Image from 'next/image'
import Link from 'next/link'

import UserImage from '../components/UserImage'

const montserrat = Montserrat({
  subsets: ['latin'],
  //weight: ['400', '700'],
  variable: '--font-montserrat',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body
        className={`bg-gray-800 text-gray-200 h-screen  ${montserrat.variable} font-sans`}
      >
        <header className="flex bg-[#0c1d36] px-5 py-5 items-center lg:px-10 xl:px-20">
          <div className="w-40 object-cover">
            <Image
              className="w-full"
              src="/images/imageLogo.png"
              alt="Logo"
              width={68}
              height={16}
            />
          </div>
          <div className="flex-1"></div>

          <UserImage />
        </header>

        {children}
      </body>
    </html>
  )
}
