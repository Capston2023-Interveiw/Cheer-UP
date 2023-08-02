import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import Analysis_NavBar1 from '../Components/Analysis_NavBar1';
import Analysis_NavBar2 from '../Components/Analysis_NavBar2';
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

const Scoregraph = styled.div`
    position: absolute;
    top: 10%;
    left: 28%;
    width: 250px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
`;
export default function Analysis_face(){

    const [faceInfo, setfaceInfo] = useState([]);
    const [timestamp, setTimestamp] = useState([]);
    const videoRef = useRef(null);

    //const num = props.video_num;
    //const api = 'api/v1/result/'+num+'/face';
    const api = 'api/v1/result/1/face';
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
        <Form>
            <Header_Aft/>
            <ViewFrame>
                <ViewFrame2>
                    <Analysis_NavBar1/>
                    <Analysis_NavBar2/>


                    
                </ViewFrame2>
            </ViewFrame>


        </Form>
    );
}