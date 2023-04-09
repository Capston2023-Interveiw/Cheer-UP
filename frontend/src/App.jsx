import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Interview from './Pages/Interview';


function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          {/* ---- 메인페이지 ---- */}
          <Route path='/' element={<Welcome />} />
          {/* ---- 면접페이지 ---- */}
          <Route path='/Interview' element={<Interview />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;