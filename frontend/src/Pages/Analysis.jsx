import React, {useState,useEffect } from 'react';
import styled from 'styled-components';
import Header_Aft from '../Components/Header_Aft';
import Synthesis from "../Components/List/Synthesis";
import Posture from "../Components/List/Posture";
import Speed from "../Components/List/Speed";
import Language from "../Components/List/Language";
import Gaze from '../Components/List/gaze';
import Face from '../Components/List/face';
import {MAIN_DATA} from '../Components/List/MAIN_DATA';

const Form = styled.div`
    width: 100%;
    height: 100%;
    padding: 0px;
    background-color: #FFFF;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2);
`;

const Button  = styled.button`
    width: 10vw;
    height: 3vh;
    padding: 0px;
    color: #000000;
    font-style: normal;
    font-weight: bolder;
    background-color: #FFFF;
    font-size: 16px;
    cursor: pointer;
    border: 1px solid;
    font: bold;
`;

const Lci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const Content = styled.div`

`;
const Container = styled.div`
  
`;

export default function Analysis(){
  
    const [content, setContent] = useState('Synthesis');

    const handleClickButton = e => {
      const { name } = e.target;
      setContent(name);
    };
  
    const selectComponent = {
        Synthesis: <Synthesis />,
        Gaze: <Gaze />,
        Face: <Face />,
        Posture: <Posture />,
        Speed: <Speed />,
        Language: <Language />,
    };
  
    console.log(content);




    return(
        <Form>
            <Header_Aft/>
            <Lci>
                <div>                
                <Container>
                    {MAIN_DATA.map(data => {
                    return (
                        <Button onClick={handleClickButton} name={data.name} key={data.id}>
                        {data.text}
                        </Button>
                    );
                    })}
                </Container>
                </div>
                <div>
                {content && <Content>{selectComponent[content]}</Content>}
                </div>
                
            </Lci>
        </Form>

    );
}