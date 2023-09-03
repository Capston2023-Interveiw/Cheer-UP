import React from 'react';
import styled from 'styled-components';
import Img1 from '../image/Speed1.png';
import Img2 from '../image/Speed2.png'; // 이미지 경로 수정
import Img3 from '../image/Speed3.png'; // 이미지 경로 수정

const Form =styled.div`
width: 100%;
height: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;

`;

const Box = styled.div`
  margin-top: 20px;
  width: 320px;
  height: 250px;
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  display: block;
`;
const Cm = styled.div`
  margin-top: 40px;
  width: 100%;
  font-style: normal;
  font-size: 140%;
  font-weight: bold;
  font: bold;
  text-align: center;
  color: #Black;
  margin-bottom: 20px;
`;

const Visualization_Speed = ({ inputData }) => {
  const data = inputData;
  //data=1;
  //data=2;
  //data=3;
  let imageToShow;

  // data 값에 따라 적절한 이미지 변수를 선택합니다.
  if (data === '평균보다 약간 빠릅니다.') {
    imageToShow = Img1;
  } else if (data === '평균 속도 입니다.') {
    imageToShow = Img2;
  } else if (data === '평균보다 약간 느립니다.') {
    imageToShow = Img3;
  } else {
    // data가 1, 2, 3이 아닌 경우 아무 것도 표시하지 않습니다.
    imageToShow = null;
  }

  return (
    <Form>
      <Box>
        {imageToShow && (
          <Image src={imageToShow} alt={`Img${data}`} />
        )}
        <Cm>
          {data}
        </Cm>
      </Box>
    </Form>
  );
};

export default Visualization_Speed;