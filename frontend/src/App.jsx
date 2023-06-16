import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Pages/Welcome';
import Interview_start from './Pages/Interview_start';
import Interview from './Pages/Interview';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import FindPW from "./Pages/FindPW";
import Main_Before from "./Pages/Main_Before";
import Main_After from "./Pages/Main_After";
import Analysis from "./Pages/Analysis";


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path = '/' element={<Analysis/>}/>
                    <Route path = '/Main_Before' element={<Main_Before/>} />
                    <Route path = '/Login' element={<Login/>} />
                    <Route path = '/SignUp' element={<SignUp/>} />
                    <Route path = '/FindPW' element={<FindPW/>} />
                    <Route path = '/Main_After' element={<Main_After/>} />
                    {/* ---- 메인페이지 ---- */}
                    <Route path='/Welcome' element={<Welcome />} />
                    {/* ---- 면접 시작 전페이지---- */}
                    <Route path='/Interview_start' element={<Interview_start />} />
                    {/* ---- 면접 페이지---- */}
                    <Route path='/Interview' element={<Interview/>} />
                </Routes>
            </Router>
        </>
    );
  };
  
  export default App;