import Link from 'next/link'

import {
  FaCalendarCheck,
  FaMapMarker,
  FaFilm,
  FaNewspaper,
  FaStar,
  FaMusic,
  FaGlobeAmericas,
} from 'react-icons/fa'

import { IoMdRestaurant } from 'react-icons/io'
import { useState } from 'react'

export default function AsideLinks() {
  return (
    <aside className="relative w-64 hidden lg:block ml-3 xl:ml-8">
      <div className="fixed my-3 mx-3 border-2 border-slate-500 p-3 rounded-lg w-64">
        <div className="p-1">
          <Link
            href="/board/main"
            className="flex items-center p-1 rounded-md hover:underline decoration-wavy transition-all"
          >
            <span className="mr-3 p-2 bg-white rounded-md text-black">
              <FaGlobeAmericas />
            </span>
            <p className="text-lg">General</p>
          </Link>
        </div>
        <div className="p-1">
          <Link
            href="/board/musica"
            className="flex items-center p-1 rounded-md hover:bg-slate-500 transition-colors"
          >
            <span className="mr-3 bg-black p-2 rounded-md">
              <FaMusic />
            </span>
            <p className="text-lg">Música</p>
          </Link>
        </div>
        <div className="p-1">
          <Link
            href="/board/pelis-series"
            className="flex items-center p-1 rounded-md hover:bg-slate-500 transition-colors"
          >
            <span className="mr-3 bg-teal-500 p-2 rounded-md">
              <FaFilm />
            </span>
            <p className="text-lg">Pelis y series</p>
          </Link>
        </div>
        <div className="p-1">
          <Link
            href="/board/lugares"
            className="flex items-center p-1 rounded-md hover:bg-slate-500 transition-colors"
          >
            <span className="mr-3 bg-green-500 p-2 rounded-md">
              <FaMapMarker />
            </span>
            <p className="text-lg">Lugares</p>
          </Link>
        </div>
        <div className="p-1">
          <Link
            href="/board/restaurantes-comida"
            className="flex items-center p-1 rounded-md hover:bg-slate-500 transition-colors"
          >
            <span className="mr-3 bg-red-500 p-2 rounded-md">
              <IoMdRestaurant />
            </span>
            <p className="text-lg">Restaurantes</p>
          </Link>
        </div>
        <div className="p-1">
          <Link
            href="/board/noticias"
            className="flex items-center p-1 rounded-md hover:bg-slate-500 transition-colors"
          >
            <span className="mr-3 bg-blue-500 p-2 rounded-md">
              <FaNewspaper />
            </span>
            <p className="text-lg">Noticias</p>
          </Link>
        </div>
        <div className="p-1">
          <Link
            href="/board/planes"
            className="flex items-center p-1 rounded-md hover:bg-slate-500 transition-colors"
          >
            <span className="mr-3 bg-amber-700 p-2 rounded-md">
              <FaCalendarCheck />
            </span>
            <p className="text-lg">Planes</p>
          </Link>
        </div>

        <div className="p-1">
          <Link
            href="/board/star"
            className="flex items-center p-1 rounded-md hover:bg-slate-500 transition-colors"
          >
            <span className="mr-3 bg-yellow-500 p-2 rounded-md">
              <FaStar />
            </span>
            <p className="text-lg">Stars</p>
          </Link>
        </div>
      </div>
    </aside>
  )
}
