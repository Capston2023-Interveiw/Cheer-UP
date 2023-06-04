import React from 'react';
import styled from 'styled-components';

const Main = styled.div`
    width: 60vw;
    height:60vh;
    border: 1px solid;
    background-color: #FFFF;
    display: flex;
    flex-direction: row;
`;

const Graph_Box  = styled.div`
    width: 30vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Graph = styled.div`
    width: 25vw;
    height: 32vh;
    border: 1px solid;
    margin: auto;
`;

const Result_Box = styled.div`
    width: 30vw;
    height: 60vh;
    position: relative;
`;

const Rank_img =styled.div`
    width: 5vw;
    height: 8vh;
    border: 1px solid;
    position: absolute;
    top: 20%;
    left: 10%;
`;
const Rank_score =styled.div`
    width: 10vw;
    height: 8vh;
    border: 1px solid;
    position: absolute;
    top: 20%;
    left: 40%;
`;

const Score_Box = styled.div`
width:11.1vw;
height:15vh;
border: 1px solid;
position: absolute;
top: 46%;
left: 20%;
`;

const Score = styled.div`
width:11.1vw;
height:3vh;

`;

export default function Synthesis(){

    return(
        <Main>
        <Graph_Box>
            <Graph>그래프 연동 예정</Graph>
        </Graph_Box>
        <Result_Box>
            <Rank_img>A</Rank_img>
            <Rank_score>총 90점 / 100점</Rank_score>
            <Score_Box>
                <Score>시선 _점</Score>
                <Score>표정 _점</Score>
                <Score>자세 _점</Score>
                <Score>평균 말속도 _점</Score>
                <Score>추임새  _점</Score>
            </Score_Box>

        </Result_Box>
 
    </Main>
    
    );
}