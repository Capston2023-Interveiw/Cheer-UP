import React from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import StartButton from "../Components/Button";
import {Link} from "react-router-dom";

const MainWrap = styled.div`
    position: fixed;
    width: 100%;
    padding: auto;
    height: 100vh;
    text-align: center;
    align-items: center;
`;

const Wrap = styled.div`
    width: 100%;
    margin-top: 40px; //중앙 정렬 고정해야함
    text-align: center;
    align-items: center;
    background-color: #e8f9fd;
`;

const Title = styled.h1`
    font-size: 30px;
    margin: 0;
`;

const WrapContent = styled.div`
    margin-left: 20px;
    height: 75vh;
    text-align: center;
    align-items: center;
    display: felx;
`;

const WrapText = styled.div`
    text-align: center;
    align-items: center;
    width: fit-content;
    padding: 50px;
`;
const WrapStartButton = styled.div`
    float: bottom;
`;

function Interview_start() {
    const iframePart = () => {
        return {
            __html: '<iframe src="http://localhost:8888" width="640" height="360px"></iframe>',
        };
    };
    return (
        <MainWrap>
            <Header />
            <Wrap>
                <WrapContent>
                    <WrapText>
                        <Title>주의사항</Title>
                        <p>밝은 곳에서 찰영해주세요.</p>
                        <p>자세를 바르게 시선은 정면을 향하게 해주세요.</p>
                        <p>생각 시간 외에는 질문을 추가로 볼 경우 감점요소가 될수있습니다.</p>
                    </WrapText>

                    <div
                        dangerouslySetInnerHTML={iframePart()}
                    ></div>

            
                </WrapContent>
                <WrapStartButton>
                    <Link to="/Interview">
                        <StartButton
                            color={"white"}
                            background={"#0084FE"}
                            width="6rem"
                            height="2.5rem"
                            name="START"
                            borderRadius="0.3rem"
                        />
                        </Link>
                    </WrapStartButton>
            </Wrap>
        </MainWrap>
    );
}

export default Interview_start;
