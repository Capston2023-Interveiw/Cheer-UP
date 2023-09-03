import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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


export default function Analysis_NavBar1(){
    return (
        <NavBar1 backgroundColor ="#FFFF">

            <Link to = '/Analysis2'>
                <Text
                    fontStyle = "blod"
                    fontWeight = "bolder"
                    fontSize = "22px"
                    top = "50%"
                    left = "2%"
                    transForm = "translate(0%, -50%)"
                    backgroundColor = "#FFFF"
                    >종합 리포트</Text>
            </Link>

            <Link to = '/Analysis_gaze'>
                <Text
                    fontStyle = "blod"
                    fontWeight = "bolder"
                    fontSize = "22px"
                    top = "50%"
                    left = "18%"
                    transForm = "translate(0%, -50%)"
                    backgroundColor = "#FFFF"
                    >세부 분석</Text>
            </Link>
        </NavBar1>
    );
  }
