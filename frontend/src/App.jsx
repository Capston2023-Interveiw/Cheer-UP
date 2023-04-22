import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import FindPW from "./Pages/FindPW";
import Main_Before from "./Pages/Main_Before";
import Main_After from "./Pages/Main_After"


function App() {
    return (
        <>
            <Router>
                <Routes>
                    <Route path = '/' element={<Main_Before/>} />
                    <Route path = '/Login' element={<Login/>} />
                    <Route path = '/SignUp' element={<SignUp/>} />
                    <Route path = '/FindPW' element={<FindPW/>} />
                    <Route path = '/Main_After' element={<Main_After/>} />
                </Routes>
            </Router>
        </>
    );
  };
  
  export default App;