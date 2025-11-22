import Link from 'next/link'
import { Suspense } from 'react'

async function getStreamingSources(episodeId) {
  try {
    const res = await fetch(`https://api.consumet.org/anime/gogoanime/watch/${episodeId}`)
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}

function LoadingSkeleton() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
      <div className="w-full h-64 skeleton"></div>
    </div>
  )
}

export default async function WatchEpisode({ params }) {
  const sources = await getStreamingSources(params.episodeId)

  if (!sources) {
    return <div className="text-center text-red-500">Error: Gagal memuat sumber streaming.</div>
  }

  const videoUrl = sources.sources[0]?.url || ''

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Streaming Episode</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-4">
          <video controls className="w-full" src={videoUrl}>
            Browser Anda tidak mendukung video.
          </video>
        </div>
      </Suspense>

      <div className="flex justify-between">
        <Link href={`/watch/${sources.prevEpisode || '#'}`} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={!sources.prevEpisode}>
          Previous Episode
        </Link>
        <Link href={`/watch/${sources.nextEpisode || '#'}`} className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50" disabled={!sources.nextEpisode}>
          Next Episode
        </Link>
      </div>
    </div>
  )
}
