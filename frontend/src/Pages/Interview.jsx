import React from "react";
// import ReactDOM from "react-dom";
import styled from "styled-components";
import Header from "../Components/Header";
import NextButton from "../Components/Button";
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
    text-align: center;
    align-items: center;
    // background-color: #e8f9fd;
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
const WrapNextButton = styled.div`
    float: bottom;
`;

function Interview() {
    const iframePart = () => {
        return {
            __html: '<iframe src="http://localhost:8888/interview/progress" width="640" height="360px"></iframe>',
        };
    };
    return (
        <MainWrap>
            <Header />
            <Wrap>
                <WrapContent>
                    

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
                            name="START"
                            borderRadius="0.3rem"
                        />
                      
                    </WrapNextButton>
            </Wrap>
        </MainWrap>
    );
}

export default Interview;
