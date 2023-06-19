import React,{useState, useEffect} from 'react';
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
    width: 25vw;
    height: 32vh;
    border: 1px solid;
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
  
    // const Loglist = ({data}) => {
    //     return(
    //         <div>
    //             {data&&data.map(face => {
    //                 return(
    //                     <div key={face.id}>
    //                         <div>{face.url}</div>
    //                         <div>{face.score}</div>
    //                         <div>{face.feedback}</div>
    //                         <div>{face.logs}</div>
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     )
    // }
    return(

        <Main>
            
            <Video_Box>
                <Video>동영상 연동 예정_표정
                     {faceInfo.url}
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
                                        {index+1}. {data.timestamp}({data.reason})
                                    </div>
                                )
                            })
                            : null}
                        </ul>
                    </DummyTable>
                </Timestamp>
                <Feedback>
                    {faceInfo.feedback}
                    피드백 내용 연동 예정</Feedback>
            </Result_Box>

        </Main>
    );
}