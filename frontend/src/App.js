import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Students from './pages/Students';
import NonFunctionals from './pages/NonFunctionals';
import Benefitss from './pages/Benefitss';
import WantToAddTexthelooInTheHeader from './components/WantToAddTexthelooInTheHeader';
import WantToAddTexthelloStudentsInTheHeader from './components/WantToAddTexthelloStudentsInTheHeader';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/students" element={<Students />} />
        <Route path="/non-functionals" element={<NonFunctionals />} />
        <Route path="/benefits,s" element={<Benefitss />} />
          <Route path="/wanttoaddtextheloointheheader" element={<WantToAddTexthelooInTheHeader />} />
          <Route path="/wanttoaddtexthellostudentsintheheader" element={<WantToAddTexthelloStudentsInTheHeader />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
