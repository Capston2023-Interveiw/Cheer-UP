import React,{useState, useEffect} from "react";
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
  font-size: 16px;
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
    const [count, setCount] = useState(90);
  
    useEffect(() => {
      const id = setInterval(() => {
        setCount(count => count - 1); 
      }, 1000);
      if(count === 0){
        clearInterval(id);
      }
      return () => clearInterval(id);
    }, [count]);

    const [question, setQuestion] = useState([]);

  
    // useEffect(()=>{
    //   // 만약 타임 아웃이 발생했을 경우
    //   if(time.current <= 0){
    //     //다음 질문으로 넘어가거나 면접 종료
    //     clearInterval(timerId.current);
    //   }
    // },[sec]);

    useEffect(() => {
      axios({
      url: "api/v1/interview/question",
      method: "get",

    }).then((response) => {
      setQuestion(response.data);

      console.log(response.data);

    }).catch(function (error) {//실패 시 catch 실행
      console.log(error);
  })
  //성공이던 실패던 항상 실행
  .then(function () {
      // always executed
  });
  },[]);

    const iframePart = () => {
        return {
            __html: '<iframe src="http://localhost:8888/interview/progress" width="750" height="450px"></iframe>',
        };
    };
    function QuestionItem({ item }) {
      return <>{item}</>;
    }

    const selectedData = question.length > 0 ? question[0].content : null;

    return (
        <MainWrap>
            <Header />
            <Wrap>
            <Question>
            Q1. {selectedData && <QuestionItem item={selectedData} />}
               {/* {question !== undefined
                              ? question.map((data, index) => {
                                  return(
                                      <div key={index}>
                                        Q{index+1}.
                                        {data.content}
                                         
                                      </div>
                                  )
                              })
                              : null}  */}
              
              
            </Question>
                <WrapContent>
                 
                  <TimerText>
                    {count} 초
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