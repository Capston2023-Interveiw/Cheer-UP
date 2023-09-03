import React from 'react';
import styled from 'styled-components';
import DonutChart from "./DonutChart";

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
const ChartBox = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

const Visualization_Face = ({ inputData }) => {
//긍정적인 표정: 3회


  // 정규 표현식을 사용하여 숫자 추출
  const positiveMatches = inputData.match(/긍정적인 표정: (\d+)회/);
  const negativeMatches = inputData.match(/부정적인 표정: (\d+)회/);

  // 추출된 숫자를 변수에 저장
  const positive = positiveMatches ? parseInt(positiveMatches[1]) : 0;
  const negative = negativeMatches ? parseInt(negativeMatches[1]) : 0;


  console.log('긍정적 표정:', positive);
  console.log('부정적 표정:', negative);
  return (
    <Form>
      <Box>
        <ChartBox>
          <DonutChart positive = {positive} negative = {negative}></DonutChart>
        </ChartBox>
      </Box>
    </Form>
  );
};



export default Visualization_Face;