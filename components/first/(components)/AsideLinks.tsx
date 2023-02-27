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

export default function AsideLinks() {
  return (
    <aside className="relative hidden lg:block">
      <div className="fixed my-3 mx-3 border-2 border-slate-500 p-3 rounded-lg w-56 xl:mx-8">
        <div className="p-2">
          <Link href="/board/main" className="flex items-center">
            <span className="mr-3">
              <FaGlobeAmericas />
            </span>
            General
          </Link>
        </div>
        <div className="p-2">
          <Link href="/board/musica" className="flex items-center">
            <span className="mr-3 text-black">
              <FaMusic />
            </span>
            Música
          </Link>
        </div>
        <div className="p-2">
          <Link href="/board/pelis-series" className="flex items-center">
            <span className="mr-3 text-teal-500">
              <FaFilm />
            </span>
            Pelis y series
          </Link>
        </div>
        <div className="p-2">
          <Link href="/board/lugares" className="flex items-center">
            <span className="mr-3 text-green-500">
              <FaMapMarker />
            </span>
            Lugares
          </Link>
        </div>
        <div className="p-2">
          <Link href="/board/restaurantes-comida" className="flex items-center">
            <span className="mr-3 text-red-500">
              <IoMdRestaurant />
            </span>
            Restaurantes
          </Link>
        </div>
        <div className="p-2">
          <Link href="/board/noticias" className="flex items-center">
            <span className="mr-3 text-blue-500">
              <FaNewspaper />
            </span>
            Noticias
          </Link>
        </div>
        <div className="p-2">
          <Link href="/board/planes" className="flex items-center">
            <span className="mr-3 text-amber-700 ">
              <FaCalendarCheck />
            </span>
            Planes
          </Link>
        </div>

        <div className="p-2">
          <Link href="/board/star" className="flex items-center">
            <span className="mr-3 text-yellow-500">
              <FaStar />
            </span>
            Stars
          </Link>
        </div>
      </div>
    </aside>
  )
}
