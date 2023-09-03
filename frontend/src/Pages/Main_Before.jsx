import React from 'react';
import styled from 'styled-components';
import Header_Bef from '../Components/Header_Bef';
import Img from '../image/MainPageImage.svg';
import { Link } from 'react-router-dom'


const Form = styled.div`
  position: relative;
  width:100vw;
  
`;

const DetailBox = styled.div`

  width: 100%;
  height: 90vh;
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0%);
  //border: 1px solid;
  display: flex;
  flex-direction: column;
`;

const MainBox = styled.div`
    display: flex;
    //border: 1px solid;
    width: 100%;
    height: auto;
    margin-top: 140px;
`;

const LeftBox =styled.div`
    //border: 1px solid;
    width: 40%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const RightBox =styled.div`
    display: flex;
    //border: 1px solid;
    flex-direction: column;
    width: 60%;
    height: 100%;
`;

const Image = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
`;


const H1 = styled.div`
    height: 80px;
    font-style: bold;
    font-size: 300%;
    font-weight: bold;
    font: bold;
    text-align: center;
    color: #0084FE;
    margin-bottom: 50px;
`;


const Cm = styled.div`
    width: 100%;
    font-style: normal;
    font-size: 140%;
    font-weight: bold;
    font: bold;
    text-align: center;
    color: #Black;
    margin-bottom: 20px;
`;


const Buttonmi = styled.button `
    height: 50px;
    width: 150px;
    padding: 10px;
    background-image:linear-gradient(to right, #FFFFFF ,#0084FE 30%);
    color: White;
    font-style: normal;
    font-weight: bolder;
    font-size: 20px;
    text-align: center;
    margin-top: 40px;
    border: 1px solid Black;
    border-radius: 25px;
    cursor: pointer;
    
`;




export default function Main_Before() {
    return(
        <Form>
            <Header_Bef/>
            <DetailBox>
                <MainBox>
                    <LeftBox>
                        <H1>Cheer UP</H1>
                        <Cm>
                            Cheer Up은 면접을 준비하는 취업 준비생들을 위해 
                        </Cm>
                        <Cm>
                            면접 태도를 분석하고 교정해주는 서비스입니다.
                        </Cm>
                        <Link to ='/Login'>
                            <Buttonmi >면접시작</Buttonmi>
                        </Link>
                    </LeftBox>
                    <RightBox>
                        <Image src={Img} />
                    </RightBox>
                </MainBox>
            </DetailBox>
        </Form>

    );
}

