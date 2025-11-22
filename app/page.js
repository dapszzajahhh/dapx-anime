import Link from 'next/link'
import { Suspense } from 'react'

async function getPopularAnime() {
  try {
    const res = await fetch('https://api.consumet.org/meta/anilist/popular?page=1&perPage=10')
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data.results
  } catch (error) {
    console.error(error)
    return []
  }
}

async function getRecentEpisodes() {
  try {
    const res = await fetch('https://api.consumet.org/meta/anilist/recent-episodes?page=1&perPage=10')
    if (!res.ok) throw new Error('Failed to fetch')
    const data = await res.json()
    return data.results
  } catch (error) {
    console.error(error)
    return []
  }
}

function AnimeCard({ anime }) {
  return (
    <Link href={`/anime/${anime.id}`} className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <img src={anime.image} alt={anime.title.english || anime.title.romaji} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{anime.title.english || anime.title.romaji}</h3>
      </div>
    </Link>
  )
}

function EpisodeCard({ episode }) {
  return (
    <Link href={`/watch/${episode.episodeId}`} className="block bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold">{episode.title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">Episode {episode.episodeNumber}</p>
    </Link>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="w-full h-48 skeleton"></div>
          <div className="p-4">
            <div className="h-4 skeleton mb-2"></div>
            <div className="h-4 skeleton w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function Home() {
  const popularAnime = await getPopularAnime()
  const recentEpisodes = await getRecentEpisodes()

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Anime Populer</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {popularAnime.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
        </div>
      </Suspense>

      <h2 className="text-2xl font-bold mb-4">Episode Terbaru</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentEpisodes.map(episode => <EpisodeCard key={episode.episodeId} episode={episode} />)}
        </div>
      </Suspense>

      <div className="mt-8">
        <input
          type="text"
          placeholder="Cari anime..."
          className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              window.location.href = `/search?q=${encodeURIComponent(e.target.value)}`
            }
          }}
        />
      </div>
    </div>
  )
}