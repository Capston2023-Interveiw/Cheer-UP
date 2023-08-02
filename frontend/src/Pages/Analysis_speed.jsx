import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import axios from 'axios';

const Form = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px;
    background-color: #FFFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;
const  ViewFrame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ViewFrame2 =styled.div`
    margin-top: 20px;
    width: 1200px;
    height: 100vh;
    border: 1px solid;
    position: relative;
`;

const NavBar1 =styled.div` 

    width: 100%;
    height: 50px;
    //border: 1px solid;
    background-color: ${(props)=> props.backgroundColor};
    position: relative;
`;


const Text = styled.button`
    text-align: center;
    position: absolute;
    border 0px;
    cursor: pointer;
    background-color: ${(props)=> props.backgroundColor};
    font-style: ${(props)=> props.fontStyle};
    font-weight: ${(props)=> props.fontWeight};
    font-size: ${(props)=> props.fontSize};
    top: ${(props)=> props.top};
    bottom: ${(props)=> props.bottom};
    left: ${(props)=> props.left};
    right: ${(props)=> props.right};
    transform:${(props)=> props.transForm};
`;



const Totalscore = styled.div`
    position: absolute;
    top: 10%;
    left: 28%;
    width: 250px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
`;
export default function Analysis_speed(){

    
    return(
        <Form>
            <Header_Aft/>
            <ViewFrame>
                <ViewFrame2>
                    <NavBar1 backgroundColor ="#FFFF">
                        <Text
                        fontStyle = "blod"
                        fontWeight = "bolder"
                        fontSize = "22px"
                        top = "50%"
                        left = "2%"
                        transForm = "translate(0%, -50%)"
                        backgroundColor = "#FFFF"
                        >종합 리포트</Text>
                        <Text
                            fontStyle = "blod"
                            fontWeight = "bolder"
                            fontSize = "22px"
                            top = "50%"
                            left = "18%"
                            transForm = "translate(0%, -50%)"
                            backgroundColor = "#FFFF"
                            >세부 분석</Text>
                    </NavBar1>
                    <NavBar1 backgroundColor ="#A3D8F4">
                        <Text
                            fontStyle = "blod"
                            fontWeight = "bolder"
                            fontSize = "22px"
                            top = "50%"
                            left = "2%"
                            transForm = "translate(0%, -50%)"
                            backgroundColor = "#A3D8F4">시선</Text>
                        <Text
                            fontStyle = "blod"
                            fontWeight = "bolder"
                            fontSize = "22px"
                            top = "50%"
                            left = "11%"
                            transForm = "translate(0%, -50%)"
                            backgroundColor = "#A3D8F4">표정</Text>
                        <Text
                            fontStyle = "blod"
                            fontWeight = "bolder"
                            fontSize = "22px"
                            top = "50%"
                            left = "21%"
                            transForm = "translate(0%, -50%)"
                            backgroundColor = "#A3D8F4">자세</Text>
                        <Text
                            fontStyle = "blod"
                            fontWeight = "bolder"
                            fontSize = "22px"
                            top = "50%"
                            left = "30%"
                            transForm = "translate(0%, -50%)"
                            backgroundColor = "#A3D8F4">평균 말속도</Text>
                        <Text
                            fontStyle = "blod"
                            fontWeight = "bolder"
                            fontSize = "22px"
                            top = "50%"
                            left = "45%"
                            transForm = "translate(0%, -50%)"
                            backgroundColor = "#A3D8F4">추임새</Text>
                    </NavBar1>

                    
                </ViewFrame2>
            </ViewFrame>


        </Form>
    );
}