import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import Analysis_NavBar1 from '../Components/Analysis_NavBar1';
import Analysis_NavBar2 from '../Components/Analysis_NavBar2';
import axios from 'axios';
import {FaRegLightbulb} from 'react-icons/fa';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Link } from 'react-router-dom';

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
    margin-bottom: 20px;
    width: 1000px;
    height: 800px;
    border: 1px solid;
    position: relative;
`;


const Video = styled.div`
    position: absolute;
    top: 22%;
    left: 5%;
`;

const Scoregraph = styled.div`
    position: absolute;
    top: 22%;
    left: 68%;
    width: 150px;
    height: 150px;
    //border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
`;

const Timestamp = styled.div`
    overflow-y: scroll;
    width: 300px;
    height: 150px;
    position: absolute;
    top: 46%;
    left: 60%;
    //border: 1px solid;
`;

const Feedback = styled.div`
    width: 500px;
    height: 150px;
    border: 1px solid;
    border-radius: 20px;
    position: absolute;
    top: 70%;
    right: 5%; 
`;

const Icons = styled.div`
    width: 30px;
    height: 30px;
    position: absolute;
    top: 15%;
    left: 3%;
`;

const Text = styled.p`
    width: 420px;
    height: 170px;
    position: absolute;
    top: 5%;
    left: 15%;
`;

const DummyTable = styled.div`
    white-space: pre-line;
`;

const TimestampButton = styled.button`
    border: none;
    background: none;
    font-size: 16px;
    font-weight: bolder;
    cursor: pointer;
    color: blue;
`;

const MypageBtn = styled.button`
  width: 230px;
  height: 41px;
  background-color: #0084FE;
  color: #fff;
  border: none;
  box-shadow: 1px 1px 1px 1px gray;
  border-radius: 15px;
  font-size: 16px;
  cursor: pointer;
  font: bold;
  position: absolute;
  top: 92%;
  right: 5%;

`;

export default function Analysis_gaze(){
    const [gazeInfo, setgazeInfo] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const [score, setScore] = useState(null);
    const videoRef = useRef(null);

    //const num = props.video_num;
    //const api = 'api/v1/result/'+num+'/gaze';
    const api = 'api/v1/result/1/gaze';
    
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
        setgazeInfo(response.data);
        setScore(response.data.score);
        console.log(response.data.url);
        console.log(gazeInfo)
      }).catch(function (error) {//실패 시 catch 실행
        console.log(error);
    })
    //성공이던 실패던 항상 실행
    .then(function () {
        // always executed
    });
    },[]);
    
    return(
        <Form>
            <Header_Aft/>
            <ViewFrame>
                <ViewFrame2>
                    <Analysis_NavBar1/>
                    <Analysis_NavBar2/>
                    <Video>
                        <video ref={videoRef} height="350px" width="500px" src={gazeInfo.url} controls/>
                    </Video>
                    <Scoregraph>                        
                        <CircularProgressbarWithChildren value={score*5}>
                            <div style={{ fontSize: 30, marginTop: 40 }}>
                                <strong>{score}</strong> 점
                            </div>
                            <div style={{ fontSize: 20}}>
                                <p>총 20점</p>
                            </div>
                            
                        </CircularProgressbarWithChildren>
                    </Scoregraph>
                    <Timestamp>
                        <DummyTable>
                            <ul>
                            {gazeInfo.logs !== undefined
                                ? gazeInfo.logs.map((data, index) => {
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
                        <Icons>
                            <FaRegLightbulb size='40px' color='#ffd400' />
                        </Icons>
                        <Text>
                            {gazeInfo.feedback}
                        </Text>
                    </Feedback>
                    <Link to = '/MyPage' style={{ textDecoration: "none" }}>
                        <MypageBtn>지난 영상 결과 보기</MypageBtn>
                    </Link>
                </ViewFrame2>
            </ViewFrame>
        </Form>
    );
}