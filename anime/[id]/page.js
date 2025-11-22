import Link from 'next/link'
import { Suspense } from 'react'

async function getAnimeInfo(id) {
  try {
    const res = await fetch(`https://api.consumet.org/meta/anilist/info/${id}`)
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
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 h-64 skeleton mb-4"></div>
        <div className="md:ml-4 flex-1">
          <div className="h-6 skeleton mb-2"></div>
          <div className="h-4 skeleton mb-2"></div>
          <div className="h-4 skeleton w-3/4"></div>
        </div>
      </div>
    </div>
  )
}

export default async function AnimeDetail({ params }) {
  const anime = await getAnimeInfo(params.id)

  if (!anime) {
    return <div className="text-center text-red-500">Error: Gagal memuat data anime.</div>
  }

  return (
    <div>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-8">
        <div className="flex flex-col md:flex-row">
          <img src={anime.image} alt={anime.title.english || anime.title.romaji} className="w-full md:w-1/3 rounded mb-4" />
          <div className="md:ml-4">
            <h1 className="text-3xl font-bold mb-2">{anime.title.english || anime.title.romaji}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{anime.description}</p>
            <p><strong>Genre:</strong> {anime.genres.join(', ')}</p>
            <p><strong>Status:</strong> {anime.status}</p>
            <p><strong>Total Episode:</strong> {anime.totalEpisodes}</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-4">Episodes</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {anime.episodes.map(episode => (
            <Link key={episode.id} href={`/watch/${episode.id}`} className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition">
              <h3 className="text-lg font-semibold">Episode {episode.number}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{episode.title}</p>
            </Link>
          ))}
        </div>
      </Suspense>
    </div>
  )
  }
