import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Interview_start from './Pages/Interview_start';
import Interview from './Pages/Interview_start';


function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* ---- 메인페이지 ---- */}
          <Route path='/' element={<Welcome />} />
          {/* ---- 면접 시작 전페이지---- */}
          <Route path='/Interview_start' element={<Interview_start />} />
          {/* ---- 면접 페이지---- */}
          <Route path='/Interview' element={<Interview/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;