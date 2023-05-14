import React from 'react';
import styled from 'styled-components';

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
  return (
    <Form>
      <H1></H1>
      <H1>Cheer Up</H1>
      <Lci>
        <Text placeholder="아이디를 입력해주세요" />
        <Password placeholder="비밀번호를 입력해주세요" />
        <Submit>로그인</Submit>
        <P>
          <P2><a href= "/FindPW">비밀번호 찾기</a></P2>
          <P2 margin-left = '20px'><a href= "/SignUp">회원 가입</a></P2>
        </P>
      </Lci>    
    </Form>
  );
};