import React from 'react';
import { BrowserRouter as Router, Routes, Route} from'react-router-dom';
import PrivateRoute from './Components/PrivateRoute';
import Interview_start from './Pages/Interview_start';
import Interview from './Pages/Interview';
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import FindPW from "./Pages/FindPW";
import Main_Before from "./Pages/Main_Before";
import Main_After from "./Pages/Main_After";
import Analysis from "./Pages/Analysis";
import Wait_Analysis from "./Pages/Wait_Analysis";
import Analysis_face from "./Pages/Analysis_face";
import Analysis_gaze from "./Pages/Analysis_gaze";
import Analysis_interjection from "./Pages/Analysis_interjection";
import Analysis_posture from "./Pages/Analysis_posture";
import Analysis_speed from "./Pages/Analysis_speed";
import MyPage from './Pages/MyPage';

function App() {
  const access = localStorage.getItem("accessToken");


  return (
    <Router>
      <Routes>

        {/* ---- 로그인 인증 없이 접근 가능페이지 ---- */}
        {/* ---- 로그인 페이지 ---- */}
        <Route path="/login"  element={<Login/>}/> 
        {/* ---- 메인페이지_로그인 전 ---- */}
        <Route path = '/' element={<Main_Before/>} />
        {/* ---- 회원가입 페이지 ---- */}
        <Route path = '/SignUp' element={<SignUp/>} />
        {/* ---- 비밀번호 찾기 페이지 ---- */}
        <Route path = '/FindPW' element={<FindPW/>} />


        {/* ---- 로그인 인증 후 접근 가능페이지 ---- */}
        {/* ---- 메인페이지_로그인 후 ---- */}
        <Route path="/Main_After" element={<PrivateRoute authenticated={access} component={<Main_After/>}/>}/>
        {/* ---- 면접 시작 전페이지---- */}
        <Route path="/Interview_start" element={<PrivateRoute authenticated={access} component={<Interview_start/>}/>}/>
        {/* ---- 면접 페이지---- */}
        <Route path="/Interview" element={<PrivateRoute authenticated={access} component={<Interview/>}/>}/>
        {/* ---- 분석대기 페이지 ---- */}
        <Route path="/Wait_Analysis" element={<PrivateRoute authenticated={access} component={<Wait_Analysis/>}/>}/>
        {/* ---- 분석 페이지 ---- */}
        <Route path="/Analysis" element={<PrivateRoute authenticated={access} component={<Analysis/>}/>}/>
        <Route path="/Analysis_face" element={<PrivateRoute authenticated={access} component={<Analysis_face/>}/>}/>
        <Route path="/Analysis_gaze" element={<PrivateRoute authenticated={access} component={<Analysis_gaze/>}/>}/>
        <Route path="/Analysis_interjection" element={<PrivateRoute authenticated={access} component={<Analysis_interjection/>}/>}/>
        <Route path="/Analysis_posture" element={<PrivateRoute authenticated={access} component={<Analysis_posture/>}/>}/>
        <Route path="/Analysis_speed" element={<PrivateRoute authenticated={access} component={<Analysis_speed/>}/>}/>
        {/* ---- 마이 페이지---- */}
        <Route path="/MyPage" element={<PrivateRoute authenticated={access} component={<MyPage/>}/>}/>





      </Routes>
    </Router>
  );
}

export default App;