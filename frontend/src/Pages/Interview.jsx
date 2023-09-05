import React,{useState, useEffect} from "react";
import styled from "styled-components";
import Header from "../Components/Header";
import NextButton from "../Components/Button";
import Button from "../Components/Button";
import axios from "axios";
import { Link } from 'react-router-dom';

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

const WrapButton = styled.div`
    float: right;
    margin-right: 60px;
`;

function Interview() {
<<<<<<< HEAD
    const [count, setCount] = useState(20);
  
=======
    const [count, setCount] = useState(90);
    const [question, setQuestion] = useState([]);
    const [num, setNum] = useState(0);
    const [data, setData] = useState('1분 자기소개 부탁드립니다.');

>>>>>>> #67
    useEffect(() => {
      const id = setInterval(() => {
        setCount(count => count - 1); 
      }, 1000);
      if(count === 0){
<<<<<<< HEAD
        clearInterval(id);
        console.log("Hello");
=======
          setNum(num => num + 1);
          setData(question[num+1]?.content);
          setCount(90);
>>>>>>> #67
      }
      return () => clearInterval(id);
    }, [count]);

    
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

  const next = () =>{
      setNum(num => num + 1);
      setData(question[num+1]?.content);
      setCount(90);
  }
  


    const iframePart = () => {
        return {
            __html: '<iframe src="http://localhost:8888/interview/progress" width="750" height="450px"></iframe>',
        };
    };

    return (
        <MainWrap>
            <Header />
            <Wrap>
            <Question>
              Q{num+1}. {data}
            </Question>
                <WrapContent>
                 
                  <TimerText>
                    {count} 초
                  </TimerText>
                    
                  
                    <div
                        dangerouslySetInnerHTML={iframePart()}
                    ></div>

            
                </WrapContent>
                <WrapButton>
                      <NextButton
                          color={"white"}
                          background={"#0084FE"}
                          width="6rem"
                          height="2.5rem"
                          name="NEXT"
                          borderRadius="0.3rem"
                          marginRight="2rem;"
                          onClick={()=>next()}
                      />
                    <Link to="/Wait_Analysis">
                      <Button
                        color={"white"}
                        background={"#0084FE"}
                        width="7rem"
                        height="2.5rem"
                        name="분석 결과 보기"
                        borderRadius="0.3rem">

                      </Button>
                      </Link>

                </WrapButton>
            </Wrap>
        </MainWrap>
    );
}

export default Interview;