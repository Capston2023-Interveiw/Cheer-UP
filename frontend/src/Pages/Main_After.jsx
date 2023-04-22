import React from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import Img1 from '../image/img1.jpg';
import { Link } from 'react-router-dom'

const Form = styled.div`
    width: 100%;
    height: 100vh;
    padding: 0px;
    background-color: #FFFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const Lci = styled.div`
    width: 80%;
    height: 70vh;
    margin: 0 auto;
    margin-top: 200px;
    background-color: #E8F9FD;
`;
//position: absolute;

const Cm = styled.h1`
    font-style: normal;
    font-weight: bolder;
    font-size: 15pt;
    vertical-align: bottom;
    text-align: center;
    color: #Black;
    height: 100px;
`

const Image = styled.div`
    //display: flex
    //align-items: flex-start;
    //float:left;
    text-align: center;
    //position: absolute;
 

`
const Buttonmi = styled.button `
    margin-left: 70px;
  width: 100px;
  padding: 10px;
  background-color: #0084FE;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  text-align: center;
  font: bold;
`;



export default function Main_After() {
    return(
        <Form>
            <Header_Aft/>
            <Lci>
                <Cm/>
                <Cm>
                    Cheer Up은 취업 준비생들을 위해 면접 태도를 분석하고 교정해주는 서비스입니다.
                </Cm>
                <Image>
                  <img src={Img1} margin-left= '10px'/>
                  <Link to ='/Login'>
                  <Buttonmi >면접시작</Buttonmi>
                  </Link>
                </Image>
                
            </Lci>
        </Form>
        

    );
}