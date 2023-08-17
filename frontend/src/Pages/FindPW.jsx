import React from 'react';
import styled from 'styled-components';


const Lci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 20vh;
  margin-top: 100px;
`;

const Form = styled.div`
  position: relative;
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

const Buttonmi = styled.button `
  width: 250px;
  padding: 15px;
  margin-top: 90px;
  background-color: #0084FE;
  color: #fff;
  border: 1px solid #ccc;
  border-radius: 15px;
  cursor: pointer;
  font-size: 17px;
  font: bold;
  font-weight: bold;
`;

export default function FindPW() {
    return (
      <MainBox>
        <Form>
          <H1></H1>
          <H1>Cheer Up</H1>
          <Lci>
            <Text placeholder="이메일을 입력해주세요" />
            <Buttonmi>보내기</Buttonmi>
          </Lci>
        </Form>
      </MainBox>
    );
  }