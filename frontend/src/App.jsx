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
import Analysis2 from "./Pages/Analysis2";
import Wait_Analysis from "./Pages/Wait_Analysis";
import Analysis_face from "./Pages/Analysis_face";
import Analysis_gaze from "./Pages/Analysis_gaze";
import Analysis_interjection from "./Pages/Analysis_interjection";
import Analysis_posture from "./Pages/Analysis_posture";
import Analysis_speed from "./Pages/Analysis_speed";

function App() {
    return (
  
            <Router>
                <Routes>
                    {/* ---- 메인페이지 ---- */}
                    <Route path='/' element={<Welcome />} /> 
                    {/* ---- 분석 페이지 ---- */}
                    <Route path = '/Analysis' element={<Analysis/>}/>
                    <Route path = '/Analysis2' element={<Analysis2/>}/>
                    <Route path = '/Analysis_face' element={<Analysis_face/>}/>
                    <Route path = '/Analysis_gaze' element={<Analysis_gaze/>}/>
                    <Route path = '/Analysis_interjection' element={<Analysis_interjection/>}/>
                    <Route path = '/Analysis_posture' element={<Analysis_posture/>}/>
                    <Route path = '/Analysis_speed' element={<Analysis_speed/>}/>
                    {/* ---- 분석대기 페이지 ---- */}
                    <Route path = '/Wait_Analysis' element={<Wait_Analysis/>}/>
                    {/* ---- 메인페이지_로그인 전 ---- */}
                    <Route path = '/Main_Before' element={<Main_Before/>} />
                    {/* ---- 메인페이지_로그인 후 ---- */}
                    <Route path = '/Main_After' element={<Main_After/>} />
                    {/* ---- 로그인 페이지 ---- */}
                    <Route path = '/Login' element={<Login/>} />
                    {/* ---- 회원가입 페이지 ---- */}
                    <Route path = '/SignUp' element={<SignUp/>} />
                    {/* ---- 비밀번호 찾기 페이지 ---- */}
                    <Route path = '/FindPW' element={<FindPW/>} />
                    {/* ---- 면접 시작 전페이지---- */}
                    <Route path='/Interview_start' element={<Interview_start />} />
                    {/* ---- 면접 페이지---- */}
                    <Route path='/Interview' element={<Interview/>} />
                    {/* ---- 마이 페이지---- */}
                    <Route path='/MyPage' element={<MyPage/>} />
                </Routes>
            </Router>
      
    );
  }
  
  export default App;