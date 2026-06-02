import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Students from './pages/Students';
import NonFunctionals from './pages/NonFunctionals';
import Benefitss from './pages/Benefitss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/non-functionals" element={<NonFunctionals />} />
        <Route path="/benefits,s" element={<Benefitss />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
