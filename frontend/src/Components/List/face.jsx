import React from 'react';
import styled from 'styled-components';

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
        url: "/result/1/face",
        method: "get",
      }).then((response) => {
        setfaceInfo(<>
            <p>{response.data.url}</p>
            <p>{response.data.score}</p>
            <p>{response.data.feedback}</p>
            <p>{response.data.logs}</p>
            </>
            );
  
        console(setfaceInfo);
      });
    },[]);
  
    return(

        <Main>
            {faceInfo}
            <Video_Box>
                <Video>동영상 연동 예정_표정</Video>
            </Video_Box>
            <Result_Box>
                <Rank_score>15점 / 20점</Rank_score>
                <Timestamp>
                    <DummyTable>
                    1. 11:13(감점이유)<br/>
                    2. 12:01(감점이유)<br/>
                    3. 13:34(감점이유)<br/>
                    4. 13:36(감점이유)<br/>
                    5. 13:44(감점이유)<br/>
                    6. 14:03(감점이유)<br/>
                    7. 15:45(감점이유)<br/>
                    8. 16:11(감점이유)<br/>
                    9. 20:36(감점이유)<br/>
                    </DummyTable>
                </Timestamp>
                <Feedback>피드백 내용 연동 예정</Feedback>
            </Result_Box>

        </Main>
    );
}