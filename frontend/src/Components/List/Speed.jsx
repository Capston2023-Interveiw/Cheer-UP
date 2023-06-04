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

const Video_Box  = styled.div`
    width: 30vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Video = styled.div`
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

const Rank_score =styled.div`
    width: 10vw;
    height: 8vh;
    border: 1px solid;
    position: absolute;
    top: 12%;
    left: 10%;
`;
const Timestamp = styled.div`
    width: 20vw;
    height: 12vh;
    border: 1px solid;
    position: absolute;
    top: 30%;
    left: 15%;
`;

const Feedback = styled.div`
    width: 20vw;
    height: 12vh;
    border: 1px solid;
    position: absolute;
    top: 55%;
    left: 15%;
`;


export default function Speed(){

    return(
        <Main>
            <Video_Box>
                <Video>동영상 연동 예정_말속도</Video>
            </Video_Box>
            <Result_Box>
                <Rank_score>15점 / 20점</Rank_score>
                <Timestamp>1. 11:35(감점이유)</Timestamp>
                <Feedback>피드백 내용 연동 예정</Feedback>
            </Result_Box>

        </Main>
    );
}