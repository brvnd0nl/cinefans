import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar react-router-dom
import './styles/IndexMovie.css';
import Slider from './components/Slider';
import SliderPopulares from './components/SliderPopulares';
import SliderAccion from './components/SliderAccion';
import SliderAventura from './components/SliderAventura';
import SliderComedia from './components/SliderComedia';
import SliderComedias from './components/SliderComedias';
import SliderCrimen from './components/SliderCrimen';
function IndexMovie() {
    const [count, setCount] = useState(0);
    return (
       
            <div>
              <Slider />
              <SliderPopulares />
              <div style={{ height: "30px" }}></div> {/* Espaciador */}
              <SliderAccion />
              <div style={{ height: "30px" }}></div> {/* Espaciador */}
              <SliderAventura />
              <div style={{ height: "30px" }}></div> {/* Espaciador */}
              <SliderComedia />
              <div style={{ height: "70px" }}></div> {/* Espaciador */}
              <SliderComedias />
              <div style={{ height: "70px" }}></div> {/* Espaciador */}
              <SliderCrimen />
              <div style={{ height: "70px" }}></div> {/* Espaciador */}
            </div>
        
        

    );

}

export default IndexMovie;