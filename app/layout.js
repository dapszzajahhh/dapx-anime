import './globals.css'

export const metadata = {
  title: 'Anime Streaming',
  description: 'Website streaming anime modern',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <nav className="bg-blue-600 dark:bg-blue-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-xl font-bold">Anime Stream</h1>
            <button
              onClick={() => document.documentElement.classList.toggle('dark')}
              className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded"
            >
              Toggle Dark Mode
            </button>
          </div>
        </nav>
        <main className="container mx-auto p-4">
          {children}
        </main>
      </body>
    </html>
  )
}