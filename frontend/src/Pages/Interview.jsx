import React,{useRef, useState, useEffect} from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import NextButton from "../Components/Button";


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
    margin: 60px;
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
  margin-left: 100px; //중앙 정렬
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

    const iframePart = () => {
        return {
            __html: '<iframe src="http://localhost:8888" width="640" height="360px"></iframe>',
        };
    };
    return (
        <MainWrap>
            <Header />
            <Wrap>
            <Question>Q. 자기소개를 해주세요.</Question>
                <WrapContent>
                  <TimerText>
                  {min} 분  {sec} 초
                  </TimerText>
                    
                  
                    <div
                        dangerouslySetInnerHTML={iframePart()}
                    ></div>

            
                </WrapContent>
                <WrapNextButton>
                    
                        <NextButton
                            color={"white"}
                            background={"#0084FE"}
                            width="6rem"
                            height="2.5rem"
                            name="NEXT"
                            borderRadius="0.3rem"
                        />
                      
                    </WrapNextButton>
            </Wrap>
        </MainWrap>
    );
}

export default Interview;
