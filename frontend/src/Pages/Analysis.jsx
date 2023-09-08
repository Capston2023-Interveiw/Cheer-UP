import React,{useState, useEffect} from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import PentagonGraph from '../Components/PentagonGraph';
import axios from 'axios';
import Analysis_NavBar1 from '../Components/Analysis_NavBar1';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Img from '../image/Profile.svg';

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
    height: 1070px;
    border: 1px solid;
    position: relative;
`;

const Username = styled.div`
    position: absolute;
    top: 8%;
    left: 3%;
    width:300px;
    height:20px;
    font-style:blod;
    font-weight:bolder;
    font-size:22px;
`;

const Profile  =styled.img`
    border: 1px solid;
    border-radius: 20px;
    background-image: url({${(props) => props.src}});
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    background-attachment: fixed;
    position: absolute;
    top: 13%;
    left: 5%;
    width:200px;
    height:230px;
`;

const Scoregraph = styled.div`
    position: absolute;
    top: 16%;
    left: 31%;
    width: 150px;
    height: 150px;
    background-color: #ffff;
`;

const Video_Box  = styled.div`
    position: absolute;
    top: 10%;
    right: 5%;
    width: 428px;
    height: 300px;
    border: 1px solid;
`;

const Graph_Box  = styled.div`
    position: absolute;
    border: 1px solid;
    top: 46%;
    left: 5%;
    width:460px;
    height:250px;
    border-radius: 20px;
`;

const Graph =styled.div`
    position: absolute;
    top: 0%;
    left: 0%;
    width: 250px; 
    height: 250px;
    //border: 1px solid;
`;
const Score_Box = styled.div`
    position: absolute;
    top: 0%;
    right: 0%;
    width:210px;
    height:250px;
    //border: 1px solid;
`;

const Score = styled.div`
    width:150px;
    height:40px;
    position: relative;
    margin-top: 10px;   
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
    font-size: 20px;
`;

const P2 =styled.p`
    position: absolute;
    right: 0%;
    margin:0px;
    text-align:right;
    font-style: blod;
    font-weight: bolder;
    font-size: 20px;
`;
const P3 = styled.p`
    margin-left:20px;
    min-width: 67px;
    text-align:left;
    font-style: blod;
    font-weight: bolder;
    font-size: 20px;
`;


const Interjection_Box = styled.img`
    position: absolute;
    top: 46%;
    right: 9%;
    width: 300px;
    height: 300px;
    border: 1px solid;
    border-radius: 20px;
    background-repeat: no-repeat;
    background-position: top center;
    background-size: cover;
    background-image: url({${(props) => props.src}});
`;

const Summary_Box = styled.div`
    position: absolute;
    top: 75%;
    left: 5%;
    width: 410px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const FaceSummary = styled.button`
    display: flex;
    align-items: center;
    width: 410px;
    height: 45px;
    background-color:#FFFF;
    border: 0px solid;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
`;

const PostureSummary = styled.button`
    display: flex;
    align-items: center;
    width: 410px;
    height: 45px;
    background-color:#FFFF;
    border: 0px solid;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
    
`;

const GazeSummary = styled.button`
    display: flex;
    align-items: center;
    width: 410px;
    height: 45px;
    background-color:#FFFF;
    border: 0px solid;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
`;

const InterjectionSummary = styled.button`
    display: flex;
    align-items: center;
    width: 410px;
    height: 45px;
    background-color:#FFFF;
    border: 0px solid;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
`;

const SpeedSummary = styled.button`
    display: flex;
    align-items: center;
    width: 410px;
    height: 45px;
    background-color:#FFFF;
    border: 0px solid;
    border-radius: 20px;
    cursor: pointer;
    padding: 0px;
    margin: 0px;
`;









export default function Analysis(){
    const [totalData, setTotalData] = useState(null);
    const [otherData, setOtherData] = useState([]);
    const [faceSummary, setFaceSummary] = useState('');
    const [postureSummary, setPostureSummary] = useState('');
    const [gazeSummary, setGazeSummary] = useState('');
    const [interjectionSummary, setInterjectionSummary] = useState('');
    const [speedSummary, setSpeedSummary] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [wordCloud, setWordCloud] = useState('');

    const location = useLocation();
    const num = location.state.num;
    console.log(location.state)
    const api = 'api/v1/result/'+num+'/total';
    
    useEffect(() => {
        axios.get(api)
        .then(response => {
            console.log(response);

            const data = response.data;
            const face_summary =data[0].summary;
            const posture_summary =data[1].summary;
            const gaze_summary =data[2].summary;
            const interjection_summary =data[3].summary;
            const speed_summary =data[4].summary;

            
            setFaceSummary(face_summary);
            setPostureSummary(posture_summary);
            setGazeSummary(gaze_summary);
            setInterjectionSummary(interjection_summary);
            setSpeedSummary(speed_summary);

            const video = data[0].videoUrl;
            const wordCloud = data[5].summary;
            console.log(wordCloud);
            setVideoUrl(video);
            setWordCloud(wordCloud);

            const total = data.find(item => item.analysis_type === 'total');
            const others = data.filter(item => item.analysis_type !== 'total');
            setTotalData(total.score);
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
                    <Analysis_NavBar1 state={{num : num}}/>
                    <Username>OOO님의 면접 분석 결과</Username>
                    <Profile src = {Img}/>
                    <Scoregraph>
                        <CircularProgressbarWithChildren value={totalData}>
                            <div style={{ fontSize: 30, marginTop: 40 }}>
                                <strong>{totalData}</strong> 점
                            </div>
                            <div style={{ fontSize: 20}}>
                                <p> /100점</p>
                            </div>
                            
                        </CircularProgressbarWithChildren>
                    </Scoregraph>
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
                        <video height="300px" width="428px" src={videoUrl} controls/>
                    </Video_Box>
                    <Summary_Box>
                        <Link to = '/Analysis_face' style={{ textDecoration: "none" }}>
                            <FaceSummary>
                                <P3>표정:</P3><P3>{faceSummary}</P3>
                            </FaceSummary>
                        </Link>
                        <Link to = '/Analysis_posture' style={{ textDecoration: "none" }}>
                            <PostureSummary>
                                <P3>자세:</P3><P3>{postureSummary}</P3>
                            </PostureSummary>
                        </Link>
                        <Link to = '/Analysis_gaze' style={{ textDecoration: "none" }}>
                            <GazeSummary>
                                <P3>시선:</P3><P3>{gazeSummary}</P3>
                            </GazeSummary>
                        </Link>
                        <Link to = '/Analysis_interjection' style={{ textDecoration: "none" }}>
                            <InterjectionSummary>
                                <P3>추임새:</P3><P3>{interjectionSummary}</P3>
                            </InterjectionSummary>
                        </Link>
                        <Link to = '/Analysis_speed' style={{ textDecoration: "none" }}>
                            <SpeedSummary>
                                <P3>말속도:</P3><P3>{speedSummary}</P3>
                            </SpeedSummary>
                        </Link>
                    </Summary_Box>

                    <Interjection_Box src={wordCloud}>
                    </Interjection_Box>

                </ViewFrame2>
            </ViewFrame>
        </Form>
    );
}
