import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar react-router-dom
import './App.css';
import Navbar from './Navbar';
import Slider from './Slider';
import SliderPopulares from './SliderPopulares';
import SliderAccion from './SliderAccion';
import SliderAventura from './SliderAventura';
import SliderComedia from './SliderComedia';
import Footer from './Footer';
import Login from './Login';
import Registro from './Registro';
import IndexMovie from './IndexMovie';
import Movie from './Movie';
import MovieList from './MovieList';

function App() {
  const [count, setCount] = useState(0);

  return (
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
          <Route path="/movie/:movieId" element={<Movie />} />
          <Route path="/movie-list" element={<MovieList />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
