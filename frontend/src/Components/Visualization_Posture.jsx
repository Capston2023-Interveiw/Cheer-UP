import React from 'react';
import styled from 'styled-components';
import Img1 from '../image/Posture.svg';


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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-width: 100%;
  //width: auto;
  height: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Cm = styled.div`
  margin-top: 10px;
  width: 100%;
  font-style: normal;
  font-size: 140%;
  font-weight: bold;
  font: bold;
  text-align: center;
  color: #Black;
  margin-bottom: 20px;
`;

const Visualization_Posture = ({ inputData }) => {
  const data = inputData;

  let imageToShow = Img1;



  return (
    <Form>
      <Box>
        {imageToShow && (
          <Image src={imageToShow} />
        )}
        <Cm>
          {data}
        </Cm>
      </Box>

    </Form>
  );
};
export default Visualization_Posture;