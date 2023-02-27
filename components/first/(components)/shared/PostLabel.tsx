//import { FaImage, FaVideo, FaLink, FaStar } from 'react-icons/fa'
'use client'

import {
  FaCalendarCheck,
  FaMapMarker,
  FaFilm,
  FaNewspaper,
  FaStar,
  FaMusic,
} from 'react-icons/fa'

import { IoMdRestaurant } from 'react-icons/io'

interface IPostLabel {
  type: string
}

export default function PostLabel({ type }: IPostLabel) {
  //let type = 'pelis/series'

  const postTypes = [
    {
      Icon: FaFilm,
      name: 'pelis-series',
      color: 'text-blue-500',
      label: 'border-t-blue-500 border-r-blue-500',
    },
    {
      Icon: IoMdRestaurant,
      name: 'restaurantes-comida',
      color: 'text-blue-500',
      label: 'border-t-red-500 border-r-red-500',
    },
    {
      Icon: FaMapMarker,
      name: 'lugares',
      color: 'text-blue-500',
      label: 'border-t-green-500 border-r-green-500',
    },
    {
      Icon: FaCalendarCheck,
      name: 'planes',
      color: 'text-blue-500',
      label: 'border-t-red-500 border-r-red-500',
    },
    {
      Icon: FaNewspaper,
      name: 'noticias',
      color: 'text-blue-700',
      label: 'border-t-blue-500 border-r-blue-500',
    },
    {
      Icon: FaStar,
      name: 'star',
      color: 'text-blue-700',
      label: 'border-t-yellow-500 border-r-yellow-500',
    },
    {
      Icon: FaMusic,
      name: 'musica',
      color: 'text-blue-700',
      label: 'border-t-black border-r-black',
    },
  ]
  const labType = postTypes.find((pt: any) => pt.name === type)

  return (
    <>
      {labType && (
        <div
          className={`triangle ${labType.label} border-t-[40px] border-r-[40px] `}
        >
          <div className="relative">
            <labType.Icon className={`absolute bottom-2 left-1 text-xl`} />
          </div>
        </div>
      )}
    </>
  )
}
