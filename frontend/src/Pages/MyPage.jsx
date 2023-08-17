import React from "react";
import styled from "styled-components";
import Header from "../Components/Header_MyPage";
import {FiUser} from 'react-icons/fi'
// import StartButton from "../Components/Button";
// import {Link} from "react-router-dom";

const MainWrap = styled.div`
    position: fixed;
    width: 100%;
    padding: auto;
    height: 100vh;
    text-align: center;
    align-items: center;
`;

const ImageBox = styled.div`
    width: 12rem;
    height: 13rem;
    border: 1px solid black;
    border-radius: 30.5px;
    align-items: center;
    display: flex;
    justify-content: center;
`

const InfoBox = styled.div`
    width: 25rem;
    height: 13rem;
    border: 1px solid black;
    border-radius: 30.5px;
    
`

const Info = styled.li`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    list-style: none;
    margin: 17px;
    margin-left: 3rem;
    padding: 5px;
`

const headers = [
    {
        text: '',
        value: 'num'
    },
    {
        text: '날짜',
        value: 'date'
    },
    {
        text: '점수',
        value: 'score'
    },
]

const items = [
    {
        num: '1',
        date: '2022.11.20',
        score: '50'
    },
    {
        num: '2',
        date: '2022.11.20',
        score: '20'
    },
    {
        num: '3',
        date: '2022.11.20',
        score: '70'
    },
]

const headerKey = headers.map((header) => header.value);

const Table = styled.table`
    width: 30rem;
    border-top: 1px solid #444444;
    border-collapse: collapse;
`

const Tr = styled.tr`
    border-bottom: 1px solid #444444;
    padding: 10px;
`

const Td = styled.td`
    border-bottom: 1px solid #444444;
    padding: 10px;
`

export default function MyPage() {

    return (
     <MainWrap>
            <Header/>
            
            <ImageBox>
                <FiUser size='130'/>
            </ImageBox>
            <InfoBox>
              <Info>
                이름 : 
              </Info>
              <Info>
                ID :  
              </Info>
              <Info>
                생년월일 : 
              </Info>
              <Info>
                이메일 : 
              </Info>
            </InfoBox>

            <Table>
                <thead>
                    <Tr>
                        {
                            headers.map((header) =>
                            <th key={header.text}>
                                {header.text}
                            </th>
                            )
                        }
                    </Tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            {
                                headerKey.map((key) => 
                                <Td key={key + index}>
                                    {item[key]}

                                </Td>
                                )
                            }
                        </tr>
                    ))
                }
                </tbody>

            </Table>
            
    </MainWrap>
  
            
        );
}