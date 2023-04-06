/*import './App.css';*/
import React from 'react';

function LoginForm() {
  return (
    <form>
      <h1>Cheer Up</h1>
      <i>
        <input type="text" placeholder="아이디를 입력해주세요" />
        <input type="password" placeholder="비밀번호를 입력해주세요" />
        <button type="submit">로그인</button>
      </i>
      <p>
        <a href="#">비밀번호 찾기</a>
        <span> | </span>
        <a href="#">회원 가입</a>
      </p>
    </form>
  );
}

export default LoginForm;