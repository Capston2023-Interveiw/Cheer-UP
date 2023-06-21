import React,{useRef, useState, useEffect} from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import NextButton from "../Components/Button";
import axios from "axios";
import {Link} from "react-router-dom";

const MainWrap = styled.div`
    position: fixed;
    width: 100%;
    padding: auto;
    height: 100%;
    text-align: center;
    align-items: center;
`;

const Wrap = styled.div`
    width: 100%;
    height: 100vh;
    text-align: center;
    align-items: center;
    background-color: #e8f9fd;
`;


const WrapContent = styled.div`
    display: flex;
    margin: 30px;
    text-align: center;
    align-items: center;
    justify-content: space-between;

`;

const Question = styled.div`
  float: top;
  padding-top: 50px;
  font-weight: bolder;
  font-size: 20px;
`

const TimerText = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-left: 70px; //중앙 정렬
`

const WrapNextButton = styled.div`
    float: right;
    margin-right: 60px;
`;

function Interview() {
    const [min, setMin] = useState(1);
    const [sec, setSec] = useState(30);
    const time = useRef(90);
    const timerId = useRef(null);

    const [data, setData] = useState();

    useEffect(()=>{
      timerId.current = setInterval(()=>{
        setMin(parseInt(time.current / 60));
        setSec(time.current % 60);
        time.current -= 1;
      },1000);
      return () => clearInterval(timerId.current);
    },[]);

    useEffect(()=>{
      // 만약 타임 아웃이 발생했을 경우
      if(time.current <= 0){
        //다음 질문으로 넘어가거나 면접 종료
        clearInterval(timerId.current);
      }
    },[sec]);

    useEffect(()=>{
    },[]);

   async function questions () {
    try{
      await axios.get('/http://localhost:8080/api/v1/progress')
      .then(response =>{
        console.log(response.data)
        setData(response.data)
      })
      }catch(e){ //에러 처리
        console.error(e); 
    }
  }

    const iframePart = () => {
        return {
            __html: '<iframe src="http://localhost:8888/interview/progress" width="640" height="360px"></iframe>',
        };
    };
    return (
        <MainWrap>
            <Header />
            <Wrap>
            <Question>
            
              {questions}
            {data && <textarea rows={10} value={JSON.stringify(data)} readOnly={true}/>}
              
            </Question>
                <WrapContent>
                 
                  <TimerText>
                  {min} 분  {sec} 초
                  </TimerText>
                    
                  
                    <div
                        dangerouslySetInnerHTML={iframePart()}
                    ></div>

            
                </WrapContent>
                <WrapNextButton>
                  <Link to="/Wait_Analysis">
                      <NextButton
                          color={"white"}
                          background={"#0084FE"}
                          width="6rem"
                          height="2.5rem"
                          name="NEXT"
                          borderRadius="0.3rem"
                      />
                    </Link> 
                </WrapNextButton>
            </Wrap>
        </MainWrap>
    );
}

export default Interview;