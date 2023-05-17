import React from 'react';
import styled from 'styled-components';
import { useState } from 'react'; 
import axios from 'axios';

const Form = styled.div`
  width: 65%;
  height: 100vh;
  padding: 0px;
  margin: 0 auto;
  background-color: #E8F9FD;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const H1 = styled.h1`
height: 100px;
font-size: 50px;
font: bold;
text-align: center;
margin: 0 auto;
margin-bottom: 0px;
margin-top: 0px;
color: #0084FE;
`;

const Text = styled.input.attrs(props=>({
  type: "text"
}))
`
  width: 300px;
  height: 20px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
`;

const Password = styled.input.attrs(props=>({
  type: "password"
}))
`
  width: 300px;
  height: 20px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
`;

const Submit = styled.button`
  width: 322px;
  padding: 10px;
  background-color: #0084FE;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  font: bold;
`;

const Lci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

const P = styled.div`
  display: flex;
  justify-content: space-between;
  width: 200px;
  margin-top: 50px;
  
`;

const P2 = styled.div`
  position: relative;
  right: 21px;
  
`;

export default function Login() {

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const [errorMessage, setErrorMessage] = useState(''); 

  const handleAccountIdChange = (e) => { 
    setId(e.target.value);
  };

  const handlePasswordChange = (e) => { 
    setPw(e.target.value);
  };

  const handleLogin = () => { // 로그인 버튼 클릭 이벤트 처리 기능
    if (!id || !pw) { // accountId 또는 암호가 비어 있으면 오류 메시지를 설정합니다
      setErrorMessage('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    axios.post('/api/v1/members/login', { // 입력한 accountId와 비밀번호로 서버에 POST 요청 전송
      id,
      pw
    })
      .then((response) => { // 요청이 성공하면 액세스 토큰을 로컬 저장소에 저장합니다
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        setErrorMessage('로그인 성공~!')
        //기본 페이지로 리디렉션하거나 다른 필요한 작업 수행
        // console.log(response.data);
        // if(response.data.code === 200){
        //   console.log("로그인");
        //   dispatch(loginUser(res.data.userInfo));
        //   setErrorMessage("");
        // }

      })
      // .catch((error) => { // 요청이 실패할 경우 응답의 상태 코드에 따라 오류 메시지를 설정합니다
      //  if (error.response.status === 401) {
      //    setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.');
      //  } else {
      //    setErrorMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
      //  }
      // });
  };

  return (
    <Form>
      <H1></H1>
      <H1>Cheer Up</H1>
      <Lci>
        <Text placeholder="아이디를 입력해주세요" 
        type="text" 
        value={id} 
        onChange={handleAccountIdChange}/>

        <Password placeholder="비밀번호를 입력해주세요" 
        type="password" 
        value={pw} 
        onChange={handlePasswordChange}/>
        {errorMessage && <div>{errorMessage}</div>}

        <Submit onClick={handleLogin} >로그인</Submit>
        <P>
          <P2><a href= "/FindPW">비밀번호 찾기</a></P2>
          <P2 margin-left = '20px'><a href= "/SignUp">회원 가입</a></P2>
        </P>
      </Lci>    
    </Form>
  );
};