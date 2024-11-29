import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importar react-router-dom
import './IndexMovie.css';
import Slider from './Slider';
import SliderPopulares from './SliderPopulares';
import SliderAccion from './SliderAccion';
import SliderAventura from './SliderAventura';
import SliderComedia from './SliderComedia';
import SliderComedias from './SliderComedias';
import SliderCrimen from './SliderCrimen';
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