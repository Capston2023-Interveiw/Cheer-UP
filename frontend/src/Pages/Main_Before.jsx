import React from 'react';
import styled from 'styled-components';
import Header_Bef from '../Components/Header_Bef';
import Img from '../image/MainPageImage.svg';
import { Link } from 'react-router-dom'


const Form = styled.div`
  position: relative;
  width:100vw;
  height:100vh;
`;

const MainBox = styled.div`
  max-width: 1000px;
  min-width: 680px;
  width: 65%;
  height: 90vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  border: 1px solid;
  display: flex;
`;

const H1 = styled.h1`

    height: 100px;
    font-size: 35px;
    font: bold;
    
    color: #0084FE;
`;




const Cm = styled.h1`
    width: 400px;
    font-style: normal;
    font-size: 14pt;
    color: #Black;

    
`;

const Image = styled.div`
    position: absolute;
    left: 10%;
    top: 30%;
`;
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
            <MainBox>
                <H1>Cheer UP</H1>
                
                <Cm>
                    Cheer Up은 취업 준비생들을 위해 면접 태도를 분석하고 교정해주는 서비스입니다.
                </Cm>
                <H1>Cheer UP</H1>
                <H1>Cheer UP</H1>
                <H1>Cheer UP</H1>
                    
                
            </MainBox>
        </Form>

    );
}

/*       <Image>
<img src={Img} margin-left= '10px' size = '500'/>
<Link to ='/Main_After'>
    <Buttonmi >면접시작</Buttonmi>
</Link>
</Image>
*/