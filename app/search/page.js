import Link from 'next/link'
import { Suspense } from 'react'

async function searchAnime(query) {
  try {
    const res = await fetch(`https://api.consumet.org/meta/anilist/${encodeURIComponent(query)}`)
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

export default async function Search({ searchParams }) {
  const query = searchParams.q || ''
  const results = query ? await searchAnime(query) : []

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Hasil Pencarian: "{query}"</h2>
      <Suspense fallback={<LoadingSkeleton />}>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {results.map(anime => <AnimeCard key={anime.id} anime={anime} />)}
        </div>
      </Suspense>
    </div>
  )
}
