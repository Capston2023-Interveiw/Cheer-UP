import React,{useEffect, useState, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';
import {FaRegLightbulb} from 'react-icons/fa';

const Main = styled.div`
    width: 60vw;
    height:60vh;
    border: 1px solid;
    border-top: 0px;
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
    margin: auto;
    margin-top: 0px;
    margin-left: 5rem;
    font-size: 20pt;
`;

const Result_Box = styled.div`
    width: 30vw;
    height: 60vh;
    position: relative;
`;

const Rank_score =styled.div`
    width: 10vw;
    height: 8vh;
    font-size: 20px;
    position: absolute;
    top: 15%;
    left: 30%;
`;

const Timestamp = styled.div`
    overflow-y: scroll;
    width: 20vw;
    height: 12vh;
    position: absolute;
    top: 30%;
    left: 15%;
`;

const Feedback = styled.div`
    width: 25vw;
    height: 12vh;
    position: absolute;
    top: 55%;
    left: 15%;
    font-size: 15px;
`;

const DummyTable = styled.div`
    white-space: pre-line;
`

const TimestampButton = styled.button`
    border: none;
    background: none;
    font-size: 16px;
    font-weight: bolder;
    cursor: pointer;
    color: blue;
    
`

export default function Interjection(props){
    const [interjectionInfo, setinterjectionInfo] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const videoRef = useRef(null);

    const num = props.video_num;
    const api = 'api/v1/result/'+num+'/interjection';

    const handleTimestampChange = (event) =>{
        setTimestamp(event.target.value);
    };

    const handleGoToTimestamp =(timestamp) =>{
        if(videoRef.current){
            const timeComponents = timestamp.split(':');
            const minutes = parseInt(timeComponents[0]) || 0;
            const seconds = parseInt(timeComponents[1]) || 0;
            const totalSeconds = minutes * 60 + seconds;
            videoRef.current.currentTime = totalSeconds;
        }
    }
    useEffect(() => {
        axios({
        url: api,
        method: "get",

      }).then((response) => {
        setinterjectionInfo(response.data);
  
        console.log(response.data);

      }).catch(function (error) {//실패 시 catch 실행
        console.log(error);
    })
    //성공이던 실패던 항상 실행
    .then(function () {
        // always executed
    });
    },[]);

    return(
        <Main>
            <Video_Box>
                <Video><video ref={videoRef} height="400" width="370" src={interjectionInfo.url} controls/></Video>
            </Video_Box>
            <Result_Box>
                <Rank_score>{interjectionInfo.score}점 / 20점</Rank_score>
                <Timestamp>
                    <DummyTable>
                    <ul>
                        {interjectionInfo.logs !== undefined
                            ? interjectionInfo.logs.map((data, index) => {
                                return(
                                    <div key={index}>
                                        {index+1}. <TimestampButton value={timestamp} onChange={handleTimestampChange} onClick={()=>handleGoToTimestamp(data.timestamp)} >
                                                {data.timestamp}
                                            </TimestampButton> ({data.reason})
                                    </div>
                                )
                            })
                            : null}
                        </ul>
                    </DummyTable>
                </Timestamp>
                <Feedback>
                    <FaRegLightbulb size='30px' color='#ffd400'/>
                    <p>
                        {interjectionInfo.feedback}
                    </p>
                </Feedback>
            </Result_Box>

        </Main>
    );
}