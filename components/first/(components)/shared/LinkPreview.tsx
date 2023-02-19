import { Ilink } from '../../../../types/types'

export default function LinkPreview({
  title,
  url,
  description,
  favicon,
  image,
}: Ilink) {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      <div className="flex gap-2 bg-slate-700">
        <div
          className={
            image
              ? 'object-cover w-1/4 h-full'
              : 'w-1/5 flex items-center justify-center bg-slate-600'
          }
        >
          <img
            src={image ? image : favicon}
            alt={title}
            className={image ? 'w-full' : 'w-12'}
          />
        </div>
        <div className="w-3/4 p-3">
          <h1 className="overflow-hidden whitespace-nowrap text-ellipsis mb-4">
            {title}
          </h1>
          <p>{description}</p>
        </div>
      </div>
    </a>
  )
}
