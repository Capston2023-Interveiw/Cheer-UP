import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const NavBar1 =styled.div` 

    width: 100%;
    height: 50px;
    border-top: 1px solid;
    border-bottom: 1px solid;
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


export default function Analysis_NavBar2(){
    const location = useLocation();
    const num = location.state.num;

    return (
        <NavBar1 backgroundColor ="#A3D8F4">
            <Link to = '/Analysis_face' state={{num : num}}>
                <Text
                    fontStyle = "blod"
                    fontWeight = "bolder"
                    fontSize = "22px"
                    top = "50%"
                    left = "2%"
                    transForm = "translate(0%, -50%)"
                    backgroundColor = "#A3D8F4">표정</Text>
            </Link>
            <Link to = '/Analysis_posture' state={{num : num}}>
                <Text
                    fontStyle = "blod"
                    fontWeight = "bolder"
                    fontSize = "22px"
                    top = "50%"
                    left = "11%"
                    transForm = "translate(0%, -50%)"
                    backgroundColor = "#A3D8F4">자세</Text>
            </Link>
            <Link to = '/Analysis_gaze' state={{num : num}}>
                <Text
                    fontStyle = "blod"
                    fontWeight = "bolder"
                    fontSize = "22px"
                    top = "50%"
                    left = "21%"
                    transForm = "translate(0%, -50%)"
                    backgroundColor = "#A3D8F4">시선</Text>
            </Link>
            <Link to = '/Analysis_interjection' state={{num : num}}>
                <Text
                    fontStyle = "blod"
                    fontWeight = "bolder"
                    fontSize = "22px"
                    top = "50%"
                    left = "30%"
                    transForm = "translate(0%, -50%)"
                    backgroundColor = "#A3D8F4">추임새</Text>
            </Link>
            <Link to = '/Analysis_speed' state={{num : num}}>
                <Text
                    fontStyle = "blod"
                    fontWeight = "bolder"
                    fontSize = "22px"
                    top = "50%"
                    left = "41%"
                    transForm = "translate(0%, -50%)"
                    backgroundColor = "#A3D8F4">평균 말속도</Text>
            </Link>
        </NavBar1>
    );
  }
