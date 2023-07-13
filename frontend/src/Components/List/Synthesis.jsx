import React ,{ useState ,useEffect } from 'react';
import styled from 'styled-components';
import PentagonGraph from '../PentagonGraph';
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

const Graph_Box  = styled.div`
    width: 30vw;
    height: 60vh;
    display: flex;
    justify-content: center;
    align-items: center;
    
`;


const Result_Box = styled.div`
    width: 30vw;
    height: 60vh;
    position: relative;
`;

const Rank_img =styled.div`
    width: 5vw;
    height: 20vh;
    position: absolute;
    top: 16%;
    left: 10%;
`;
const Rank_score =styled.div`
    width: 15vw;
    height: 8vh;
    position: absolute;
    top: 21%;
    left: 40%;
`;

const Score_Box = styled.div`
    width:20vw;
    height:15vh;
    position: absolute;
    top: 50%;
    left: 10%;
    border: 1px solid;
    border-radius: 10px;
    padding: 10px;
`;

const Score = styled.div`
    width:15vw;
    height:3vh;
    position: relative;
    margin-left: 15px;
    text-align: center;

`;

const P1 =styled.p`
position: absolute;
left: 0%;
margin:0px;
text-align:left;
font-style: medium;
font-weight: medium;
font-size: 1.5vw;
`;

const P2 =styled.p`
position: absolute;
right: 0%;
margin:0px;
text-align:right;
font-style: medium;
font-weight: medium;
font-size: 1.5vw;
`;

const P3 =styled.p`
position: absolute;
margin:0px;
font-style: normal;
font-weight: bolder;
font-size: 2vw;
`;



const Graph =styled.div`
width: 23vw; 
height: 45vh;
`;


export default function Synthesis(props){
    const [totalData, setTotalData] = useState(null);
    const [otherData, setOtherData] = useState([]);
   

    const num = props.video_num;
    console.log(num);
    const api = 'api/v1/result/'+num+'/total';
    useEffect(() => {
        axios.get(api)
        .then(response => {
            const data = response.data;
            const total = data.find(item => item.analysis_type === 'total');
            const others = data.filter(item => item.analysis_type !== 'total');
            setTotalData(total);
            setOtherData(others);
            setGrade(calculateGrade(total.score));
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
        <Main>
        <Graph_Box>
            <Graph>
                {totalData && <PentagonGraph data={otherData} />}
            </Graph>       
        </Graph_Box>
        <Result_Box>
            <Rank_img>
   
            </Rank_img>
                {totalData &&(
                    <Rank_score><P3>총 {totalData.score}점 / 100점</P3></Rank_score>
                )}
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
        </Result_Box>
 
    </Main>
    
    );
}