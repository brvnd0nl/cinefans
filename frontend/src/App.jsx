import { useState, useEffect } from 'react'
import Header from './components/Header'
import './styles/App.css'

function App() {
  const [movies, setMovies] = useState([]);

  const BASE_URL = 'http://localhost:5000/movies'

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => setMovies(data))
      .catch(error => console.error('Error fetching movies:', error))
  }, [])

  return (
    <>
      <Header />
      <div className='p-8'>
        <h1 className='text-3xl font-bold'>Bienvenido a <span className='italic'>CINEFAN</span></h1>
      </div>
      <p>A continuación te mostraremos el top 10 de peliculas mas vistas en la actualidad.</p>

      <div className='grid grid-cols-1 gap-4 p-8'>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            {movie.title} ({movie.year})
          </li>
        ))}
      </ul>
      </div>

    </>
  )
}

export default App
