import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar react-router-dom
import './styles/App.css';
import Navbar from './components/Navbar';
import Slider from './components/Slider';
import SliderPopulares from './components/SliderPopulares';
import SliderAccion from './components/SliderAccion';
import SliderAventura from './components/SliderAventura';
import SliderComedia from './components/SliderComedia';
import Footer from './components/Footer';
import Login from './pages/Login';
import Registro from './pages/Registro';
import IndexMovie from './IndexMovie';
import { AuthProvider } from './context/AuthContext';
import SearchResults from './pages/SearchResults';
import MovieDetail from './pages/MovieDetail';
import Movie from './Movie';
import MovieList from './MovieList';
function App() {
  const [count, setCount] = useState(0);

  return (
    <AuthProvider>
      <Router> {/* Envolver todo en un Router */}
        <div className="App">
          <Navbar />
          <Routes>
            {/* Definir la ruta de la página principal */}
            <Route path="/" element={
              <>
                <IndexMovie />
                
              </>
            } />
            {/* Definir la ruta de la página de Login */}
            <Route path="/login" element={<Login />} /> {/* Ruta para la página Login */}
            <Route path="/registro" element={<Registro />} /> {/* Ruta para la página Login */}
            <Route path="/index-movie" element={<IndexMovie />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/movie-info/:id" element={<MovieDetail />} />
            <Route path="/movie/:movieId" element={<Movie />} />
            <Route path="/movie-list" element={<MovieList />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
