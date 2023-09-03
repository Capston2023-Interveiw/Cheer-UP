import React,{useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import PentagonGraph from '../Components/PentagonGraph';
import axios from 'axios';
import Analysis_NavBar1 from '../Components/Analysis_NavBar1';
import Visualization_Speed from '../Components/Visualization_Speed';
import Visualization_Face from '../Components/Visualization_Face';
import Visualization_Gaze from '../Components/Visualization_Gaze';
//import Visualization_Interjection from '../Components/Visualization_Interjection';
import Visualization_Posture from '../Components/Visualization_Posture';

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
    width: 65%;
    max-width: 1200px;
    min-width: 1130px;
    
    height: 1600px;
    border: 1px solid;
    position: relative;
`;

const Username = styled.div`
    position: absolute;
    top: 6%;
    left: 3%;
    width:300px;
    height:20px;
    font-style:blod;
    font-weight:bolder;
    font-size:22px;
`;

const Profile  =styled.div`
    border: 1px solid;
    border-radius: 20px;
    position: absolute;
    top: 10%;
    left: 5%;
    width:200px;
    height:250px;
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

const Video_Box  = styled.div`
    position: absolute;
    top: 7%;
    right: 5%;
    width: 500px;
    height: 350px;
    border: 1px solid;
`;

const Graph_Box  = styled.div`
    position: absolute;
    border: 1px solid;
    top: 30%;
    left: 5%;
    width:550px;
    height:300px;
    border-radius: 20px;
`;

const Graph =styled.div`
    position: absolute;
    top: 0%;
    left: 0%;
    width: 300px; 
    height: 300px;
`;
const Score_Box = styled.div`
    position: absolute;
    top: 0%;
    right: 0%;
    width:250px;
    height:300px;
    //border: 1px solid;
`;

const Score = styled.div`
    width:180px;
    height:40px;
    position: relative;
    margin-top: 17px;   
    margin-left:35px;
    text-align: center;
    //border: 1px solid;
`;

const P1 =styled.p`
    position: absolute;
    left: 0%;
    margin:0px;
    text-align:left;
    font-style: blod;
    font-weight: bolder;
    font-size: 22px;
`;

const P2 =styled.p`
    position: absolute;
    right: 0%;
    margin:0px;
    text-align:right;
    font-style: blod;
    font-weight: bolder;
    font-size: 22px;
`;

const Face_Box = styled.button`
    position: absolute;
    top: 32%;
    right: 5%;
    width: 400px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
    cursor: pointer;
`;

const Gaze_Box = styled.button`
    position: absolute;
    top: 55%;
    right: 5%;
    width: 400px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
    cursor: pointer;
`;

const Interjection_Box = styled.button`
    position: absolute;
    top: 55%;
    left: 5%;
    width: 400px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
    cursor: pointer;
`;

const Posture_Box = styled.button`
    position: absolute;
    top: 78%;
    left: 5%;
    width: 400px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
    cursor: pointer;
`;

const Speed_Box = styled.button`
    position: absolute;
    top: 78%;
    right: 5%;
    width: 400px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
    cursor: pointer;
`;



export default function Analysis2(){
    const [totalInfo, setTotalInfo] = useState([]);
    const [totalData, setTotalData] = useState(null);
    const [otherData, setOtherData] = useState([]);
    const [faceSummary, setFaceSummary] = useState('');
    const [postureSummary, setPostureSummary] = useState('');
    const [gazeSummary, setGazeSummary] = useState('');
    //const [interjectionSummary, setInterjectionSummary] = useState('');
    const [speedSummary, setSpeedSummary] = useState('');

    //const num = props.video_num;
    //console.log(num);
    //const api = 'api/v1/result/'+num+'/total';
    const api = 'api/v1/result/1/total';
    useEffect(() => {
        axios.get(api)
        .then(response => {
            console.log(response);
            setTotalInfo(response.data);
            const data = response.data;
            const face_summary =data[0].summary;
            const posture_summary =data[1].summary;
            const gaze_summary =data[2].summary;
            const interjection_summary =data[3].summary;
            const speed_summary =data[4].summary;
            console.log(face_summary);
            console.log(posture_summary);
            console.log(gaze_summary);
            console.log(interjection_summary);
            console.log(speed_summary);
            setFaceSummary(face_summary);
            setPostureSummary(posture_summary);
            setGazeSummary(gaze_summary);
            //setInterjectionSummary(interjection_summary);
            setSpeedSummary(speed_summary);

            const total = data.find(item => item.analysis_type === 'total');
            const others = data.filter(item => item.analysis_type !== 'total');
            setTotalData(total);
            setOtherData(others);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }, []);
    
    const analysisTypeMap = {
        face: '표정',
        posture: '자세',
        gaze: '시선',
        interjection: '추임새',
        speed: '말속도'
    };

    return(
        <Form>
            <Header_Aft/>
            <ViewFrame>
                <ViewFrame2>
                    <Analysis_NavBar1/>
                    <Username>OOO님의 면접 분석 결과</Username>
                    <Profile>프로필 사진</Profile>
                    <Scoregraph>총점 그래프</Scoregraph>
                    <Graph_Box>
                        <Graph>
                            {totalData && <PentagonGraph data={otherData} />}
                        </Graph>
                        <Score_Box>
                        {otherData.length > 0 && (
                            <div>
                            {otherData.map((item, index) => (
                                <Score key={index} >
                                    <P1>{analysisTypeMap[item.analysis_type]}</P1>
                                    <P2>{item.score}점</P2>
                                </Score>
                            ))}
                            </div>
                        )}
                        </Score_Box>
                    </Graph_Box>
                    <Video_Box>
                        <video height="350px" width="500px" src={totalInfo.url} controls/>
                    </Video_Box>
                    <Link to = '/Analysis_face'>
                        <Face_Box>
                            <Visualization_Face inputData={faceSummary}/>
                        </Face_Box>
                    </Link>
                    <Link to = '/Analysis_gaze'>
                        <Gaze_Box>
                            <Visualization_Gaze inputData={gazeSummary}/>
                        </Gaze_Box>
                    </Link>
                    <Link to = '/Analysis_interjection'>
                        <Interjection_Box>
                            워드 클라우드
                        </Interjection_Box>
                    </Link>
                    <Link to = '/Analysis_posture'>
                        <Posture_Box>
                            <Visualization_Posture inputData={postureSummary}/>
                        </Posture_Box>
                    </Link>
                    <Link to = '/Analysis_speed'>
                        <Speed_Box>
                            <Visualization_Speed inputData={speedSummary}/>
                        </Speed_Box>
                    </Link>

                    
                </ViewFrame2>
            </ViewFrame>


        </Form>
    );
}
