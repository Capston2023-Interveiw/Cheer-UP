import React,{useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import {MAIN_DATA} from '../Components/List/MAIN_DATA';
import PentagonGraph from '../Components/PentagonGraph';
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

const NavBar1 =styled.div` 

    width: 100%;
    height: 50px;
    //border: 1px solid;
    background-color: #FFFF;
    position: relative;
`;

const Text = styled.button`
    text-align: center;
    position: absolute;
    border 0px;
    cursor: pointer;
    background-color: ${(props)=> props.backgroundColor};
    font-style: ${(props)=> props.fontStyle};
    font-weight: ${(props)=> props.fontWeight};
    font-size: ${(props)=> props.fontSize};
    top: ${(props)=> props.top};
    bottom: ${(props)=> props.bottom};
    left: ${(props)=> props.left};
    right: ${(props)=> props.right};
    transform:${(props)=> props.transForm};
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

const Username = styled.div`
    position: absolute;
    top: 6%;
    left: 3%;
    width:300px;
    height:20px;
    font-style:blod;
    font-weight:bolder;
    font-size:1.5vw;
`;
const Graph_Box  = styled.div`
    position: absolute;
    border: 1px solid;
    top: 35%;
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
    font-size: 1.5vw;
`;

const P2 =styled.p`
    position: absolute;
    right: 0%;
    margin:0px;
    text-align:right;
    font-style: blod;
    font-weight: bolder;
    font-size: 1.5vw;
`;

const Video_Box  = styled.div`
    position: absolute;
    top: 7%;
    right: 5%;
    width: 500px;
    height: 350px;
    border: 1px solid;
    border-radius: 20px;
`;

const Wordcloud = styled.button`
    position: absolute;
    top: 37%;
    right: 5%;
    width: 400px;
    height: 250px;
    border: 1px solid;
    border-radius: 20px;
    background-color:#FFFF;
    cursor: pointer;
`;

export default function Analysis2(){
    const [totalData, setTotalData] = useState(null);
    const [otherData, setOtherData] = useState([]);

    //const num = props.video_num;
    //console.log(num);
    //const api = 'api/v1/result/'+num+'/total';
    const api = 'api/v1/result/1/total';
    useEffect(() => {
        axios.get(api)
        .then(response => {
            const data = response.data;
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
                    <NavBar1>
                        <Text
                        fontStyle = "blod"
                        fontWeight = "bolder"
                        fontSize = "1.5vw"
                        top = "50%"
                        left = "2%"
                        transForm = "translate(0%, -50%)"
                        backgroundColor = "#FFFF"
                        >종합 리포트</Text>
                        <Text
                            fontStyle = "blod"
                            fontWeight = "bolder"
                            fontSize = "1.5vw"
                            top = "50%"
                            left = "18%"
                            transForm = "translate(0%, -50%)"
                            backgroundColor = "#FFFF"
                            >세부 분석</Text>
                    </NavBar1>
                    <Username>OOO님의 면접 분석 결과</Username>
                    <Profile/>
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
                    <Video_Box>전체 영상</Video_Box>
                    <Wordcloud>워드 클라우드</Wordcloud>
                    
                </ViewFrame2>
            </ViewFrame>


        </Form>
    );
}
