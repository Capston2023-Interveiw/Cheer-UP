import React, {useState,useEffect } from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';

const Form = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px;
    background-color: #FFFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const List = styled.button`
  width: 150px;
  padding: 10px;
  color: #000000;
  background-color: #FFFF;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid;
  font: bold;
`;

const Main = styled.div`
    width: 900px;
    flex-direction: row;
    border: 1px solid;
    background-color: #FFFF;
    
`;

const Lci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
`;

const Graph = styled.div`
    width: 400px;
    height: 400px;
    border: 1px solid;
`;

const Rank =styled.div`
    width: 200px;
    height: 30px;
    border: 1px solid;
`;

const Score = styled.div`
width:200px;
height:50px;
border: 1px solid;
`;


export default function Analysis(){
    
    return(
        <Form>
            <Header_Aft/>
            <Lci>
                <div>                
                    <List>종합</List>
                    <List>시선</List>
                    <List>표정</List>
                    <List>자세</List>
                    <List>말속도</List>
                    <List>추임새</List>
                </div>
                <Main>
                    <Graph>그래프 추가 예정</Graph>
                    <Rank>랭크 이미지 추가예정</Rank>
                    <Score>상세 점수 추가 예정</Score>
                </Main>
                
            </Lci>
        </Form>

    );
}