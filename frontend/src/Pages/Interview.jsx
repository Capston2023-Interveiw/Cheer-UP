import React, { useState } from 'react';
import styled from 'styled-components';
import Header from '../Components/Header';
import StartButton from '../Components/Button';

const MainWrap = styled.div`
  position: absolute;
  background-color: #E8F9FD;
  width: 100%;
  padding: auto;
  height: 80%; 
  margin-top: 2.5rem;
`;

const Wrap = styled.div`
  margin: 8rem auto 0rem auto;
  width: fit-content;
  height: fit-content;

  padding: 3rem;
  text-align: left;
  box-sizing: content-box;
`;

const Title = styled.h1`
  color: 
  font-size: 3px;
`;

const WrapContent = styled.div`
  display: flex;
  /* margin: auto 0; */
`;

const BookImage = styled.div`
  width: 18rem;
  height: 24rem;
  /* margin-top: 1rem; */
  background-color: #ffffff;
`;

const WrapReview = styled.div`
  margin-left: 3rem;
`;

const BookTitle = styled.h1`
  margin-top: 0rem;
  /* border: 1px solid black; */
  font-weight: bold;
`;
const BookDetail = styled.div`
  /* border: 1px solid black; */
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;
const WrapReviewTitle = styled.div`
  margin-right: 0.4rem;
`;

const WrapDetailReview = styled.div`
  width: fit-content;
  height: 12rem;
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 0.2rem;
`;

const WrapStar = styled.div`
  width: 40rem;
  display: flex;
`;

const WrapStarRating = styled.div`
  margin-right: 1rem;
  margin-bottom: 1rem;
  display: flex;
`;

const DetailReview = styled.textarea`
  box-sizing: border-box;
  width: 40rem;
  height: 6rem;
  display: block;
  margin-bottom: 1rem;
  padding: 1rem;
  border: 0.15rem solid rgba(128, 109, 70);
  border-radius: 0.3rem;
  font-family: 'Noto Sans KR', sans-serif;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const WrapRegButton = styled.div`
  float: right;
`;

function Interview() {

  return (
    <div>
        <Header />
        <MainWrap>
          <Wrap>
            <Title>
                주의사항</Title>
                <p>밝은 곳에서 찰영해주세요.</p>

<p>자세를 바르게 시선은 정면을 향하게 해주세요.</p>

<p>생각 시간 외에는 질문을 추가로 볼 경우 감점요소가 될수있습니다.</p>

            <WrapContent>
              <WrapReview>
          
                <WrapDetailReview>
                  
                   
                    
                  <WrapRegButton>
                   
                  </WrapRegButton>
                </WrapDetailReview>
              </WrapReview>
              <StartButton
                      color={'white'}
                      background={'#0084FE'}
                      width='6rem'
                      height='2.5rem'
                      name='START'
                      borderRadius='0.3rem'
                    />
            </WrapContent>
          </Wrap>
        </MainWrap>

    </div>
  );
}

export default Interview;