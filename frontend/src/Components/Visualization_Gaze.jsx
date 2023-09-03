import React from 'react';
import styled from 'styled-components';
import Img from '../image/Gaze.png';
import PointPlotter from "./PointPlotter";

const Form =styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;

const Box = styled.div`
  width: 320px;
  height: 250px;
  position: relative;
`;

const Image = styled.img`
  position: absolute;
  left: 50%;
  top: 55%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: auto;
  display: block;
`;

const PointBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;



const Visualization_Gaze = ({ inputData }) => {
  //왼쪽: 3회, 오른쪽: 3회

  // 정규 표현식을 사용하여 숫자 추출
  const leftMatches = inputData.match(/왼쪽: (\d+)회/);
  const rightMatches = inputData.match(/오른쪽: (\d+)회/);

  // 추출된 숫자를 변수에 저장
  const left = leftMatches ? parseInt(leftMatches[1]) : 0;
  const right = rightMatches ? parseInt(rightMatches[1]) : 0;


  console.log('왼쪽:', left);
  console.log('오른쪽:', right);
  return (
    <Form>
      <Box>
        <Image src={Img}/>
        <PointBox>
          <PointPlotter left = {left} right = {right}></PointPlotter>
        </PointBox>
      </Box>
    </Form>
  );
};



export default Visualization_Gaze;