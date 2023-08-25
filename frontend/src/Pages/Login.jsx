import React from 'react';
import styled from 'styled-components';
import { useState } from 'react'; 
import axios from 'axios';
import { Link } from 'react-router-dom';


const Form = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
`;

const MainBox = styled.div`
  width: 65%;
  max-width: 1000px;
  min-width: 680px;
  height: 80vh;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0px;
  background-color: rgba( 232, 249, 253, 0.5 );
  border-radius: 7%;
  border: 1px solid #ccc;
  box-shadow: 1px 1px grey;
`;

const H1 = styled.h1`
height: 100px;
font-size: 70px;
font: bold;
text-align: center;
margin: 0 auto;
margin-bottom: 0px;
margin-top: 0px;
color: #0084FE;
`;


const Text = styled.input`

  width: 400px;
  height: 30px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 17px;
`;

const Password = styled.input`
  width: 400px;
  height: 30px;
  padding: 10px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 15px;
  font-size: 17px;
`;

const Submit = styled.button`
  width: 250px;
  padding: 15px;
  margin-top: 40px;
  background-color: #0084FE;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  font-size: 17px;
  font: bold;
  font-weight: bold;
`;

const Lci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

const P = styled.div`
  width: 200px;
  margin-top: 50px;
  position: relative;
`;


const TextLink = styled.div`
position: absolute;
width: 120px;
font-size: 17px;
top: 50%;
left: 50%;
transform: ${(props) => props.transForm};

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
    console.log(id);
    console.log(pw);
    axios.post('/api/v1/members/login', { // 입력한 accountId와 비밀번호로 서버에 POST 요청 전송
      id,
      pw
    })
      .then((response) => { // 요청이 성공하면 액세스 토큰을 로컬 저장소에 저장합니다
        const { accessToken } = response.data;
        localStorage.setItem('accessToken', accessToken);
        setErrorMessage('로그인 성공~!')
        //기본 페이지로 리디렉션하거나 다른 필요한 작업 수행
        console.log(response.data);
        if(response.data.code === 200){
          console.log("로그인");
          //dispatch(loginUser(res.data.userInfo));
          setErrorMessage("");
        }
      })
      .catch((error) => { // 요청이 실패할 경우 응답의 상태 코드에 따라 오류 메시지를 설정합니다
       if (error.response.status === 401) {
         setErrorMessage('아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요.');
       } else {
         setErrorMessage('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
       }
      });
  };

  return (
    <Form>
      <MainBox>
        <H1></H1>
        <H1>Log In</H1>
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
            <Link to ='/FindPW'>
              <TextLink transForm={'translate(-93%, -50%)'}>비밀번호 찾기</TextLink>
            </Link>
            <Link to ='/SignUp'>
              <TextLink transForm={'translate(25%, -50%)'}>회원 가입</TextLink>
            </Link>
          </P>
        </Lci>    
      </MainBox>
    </Form>
  );
}