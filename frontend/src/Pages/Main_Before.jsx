import React from 'react';
import styled from 'styled-components';
import Header_Bef from '../Components/Header_Bef';
import Img1 from '../image/img1.jpg';
import { Link } from 'react-router-dom'


const Form = styled.div`
    width: 100%;
    height: 100vh;
    padding: 0px;
    background-color: #FFFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
    position: relative;
`;

const Lci = styled.div`
    width: 1400px;
    height: 800px;
    margin: 0 auto;
    background-color: #E8F9FD;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);

`;


const Cm = styled.h1`
    width: 800px;
    font-style: normal;
    font-size: 15pt;
    color: #Black;
    position: absolute;
    left: 50%;
    top: 10%;
    transform: translate(-50%, 0%);
`

const Image = styled.div`
    position: absolute;
    left: 10%;
    top: 30%;
`
const Buttonmi = styled.button `
    height: 50px;
    width: 150px;
    padding: 10px;
    background-color: #0084FE;
    color: White;
    border: 0px ;
    border-radius: 25px;
    border-color: Black;
    font-style: normal;
    font-weight: bolder;
    font-size: 20px;
    text-align: center;
    position: absolute;
    left: 135%;
    top: 85%;
`;




export default function Main_Before() {
    return(
        <Form>
            <Header_Bef/>
            <Lci>
                <Cm>
                    Cheer Up은 취업 준비생들을 위해 면접 태도를 분석하고 교정해주는 서비스입니다.
                </Cm>
                <Image>
                  <img src={Img1} margin-left= '10px'/>
                  <Link to ='/Main_After'>
                  <Buttonmi >면접시작</Buttonmi>
                  </Link>
                </Image>
                
            </Lci>
        </Form>
        

    );
}