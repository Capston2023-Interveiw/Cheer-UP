import React from 'react';
import styled from 'styled-components';


const Lci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  margin-top: 90px;
`;

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


const Text = styled.input`

  width: 300px;
  height: 20px;
  padding: 10px;
  margin-bottom: 50px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 14px;
`;

const Buttonmi = styled.button `
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
  padding: 10px;
  background-color: #0084FE;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  font: bold;
`;

export default function FindPW() {
    return (
      <Form>
        <H1></H1>
        <H1>Cheer Up</H1>
        <Lci>
          <Text placeholder="이메일을 입력해주세요" />
          <Buttonmi>보내기</Buttonmi>
        </Lci>
      </Form>
    );
  }