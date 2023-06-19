import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
    border: 1px solid;
    position: absolute;
    top: 12%;
    left: 10%;
`;
const Timestamp = styled.div`
    overflow-y: scroll;
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

const DummyTable = styled.div`
    white-space: pre-line;
`


export default function Face(){
    const [faceInfo, setfaceInfo] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const videoRef = useRef(null);

    const handleTimestampChange = (event) =>{
        setTimestamp(event.target.value);
    };

    const handleGoToTimestamp =(timestamp) =>{
        console.log(timestamp);
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
        url: "api/v1/result/1/face",
        method: "get",

      }).then((response) => {
        setfaceInfo(response.data);
  
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
            {/* <input type="text" value={timestamp} onChange={handleTimestampChange} placeholder="hh:mm:ss" />
            <button onClick={handleGoToTimestamp}>Go</button> */}
            {/* <div>
                <video ref={videoRef} src="https://www.youtube.com/embed/dQw4w9WgXcQ" controls width="640" height="360"></video>
            </div> */}
            <Video_Box>
                <Video>
                     {/* {faceInfo.url} */}
                     <video ref={videoRef} height="400" width="300" src="/video/test.mp4" controls/>
                </Video>
                
            </Video_Box>
            <Result_Box>
                <Rank_score>{faceInfo.score}점 / 20점</Rank_score>
                <Timestamp>
                    <DummyTable>
                        <ul>
                        {faceInfo.logs !== undefined
                            ? faceInfo.logs.map((data, index) => {
                                return(
                                    <div key={index}>
                                        {index+1}. <button value={timestamp} onChange={handleTimestampChange} onClick={()=>handleGoToTimestamp(data.timestamp)} >
                                                {data.timestamp}
                                            </button> ({data.reason})
                                    </div>
                                )
                            })
                            : null}
                        </ul>
                    </DummyTable>
                </Timestamp>
                <Feedback>
                    {faceInfo.feedback}
                </Feedback>
            </Result_Box>

        </Main>
    );
}