import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import Analysis_NavBar1 from '../Components/Analysis_NavBar1';
import Analysis_NavBar2 from '../Components/Analysis_NavBar2';
import axios from 'axios';
import {FaRegLightbulb} from 'react-icons/fa';

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


const Video = styled.div`
    position: absolute;
    top: 15%;
    left: 5%;
`;

const Scoregraph = styled.div`
    position: absolute;
    top: 15%;
    left: 65%;
    width: 250px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
`;

const Timestamp = styled.div`
    overflow-y: scroll;
    width: 400px;
    height: 150px;
    position: absolute;
    top: 40%;
    left: 60%;
`;

const Feedback = styled.div`
    width: 500px;
    height: 150px;
    border: 1px solid;
    border-radius: 20px;
    position: absolute;
    top: 55%;
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

const Speedgraph = styled.div`
    position: absolute;
    top: 50%;
    left: 8%;
    width: 400px;
    height: 220px;
    border: 1px solid;
    border-radius: 20px;
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
  top: 80%;
  right: 5%;

`;

export default function Analysis_speed(){
    const [speedInfo, setspeedInfo] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const videoRef = useRef(null);

    //const num = props.video_num;
    //const api = 'api/v1/result/'+num+'/speed';
    const api = 'api/v1/result/1/speed';

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
        setspeedInfo(response.data);
  
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
        <Form>
            <Header_Aft/>
            <ViewFrame>
                <ViewFrame2>
                    <Analysis_NavBar1/>
                    <Analysis_NavBar2/>
                    <Video>
                        <video ref={videoRef} height="350px" width="500px" src={speedInfo.url} controls/>
                    </Video>
                    <Scoregraph>말속도 점수 그래프</Scoregraph>
                    <Timestamp>
                        <DummyTable>
                            <ul>
                            {speedInfo.logs !== undefined
                                ? speedInfo.logs.map((data, index) => {
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
                            {speedInfo.feedback}
                        </Text>
                    </Feedback>
                    <Speedgraph>말속도 시각화</Speedgraph>
                    <MypageBtn>지난 영상 결과 보기</MypageBtn>
                    
                </ViewFrame2>
            </ViewFrame>


        </Form>
    );
}