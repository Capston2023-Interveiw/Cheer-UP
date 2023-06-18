import React, {useState} from 'react';
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
    height: 6vh;
    border: 0px;
    border-right: 1px solid;
    border-bottom: 1px solid;
    font-style: normal;
    font-weight: bolder;
    font-size: 20px;
    background-color: ${props => (props.isActive ? '#A3D8F4' : '#FFFF')};
    border-bottom:  ${props => (props.isActive ? '0px solid' : '1px solid')};
`;


const Lci = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;


const Container = styled.div`   
    border: 1px solid;
    border-bottom: 0px;
    border-right: 0px;
`;

export default function Analysis(){
  
    const [content, setContent] = useState('Synthesis');
    const [activeButton, setActiveButton] = useState('Synthesis');

    const handleClickButton = (name) => {
        setContent(name);
        setActiveButton(name);
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
                        <Button
                        key={data.id}
                        isActive={activeButton === data.name}
                        onClick={()=>handleClickButton(data.name)}
                      >
                        {data.text}
                        </Button>
                    );
                    })}
                </Container>
                </div>
                {content && <div>{selectComponent[content]}</div>}
            </Lci>
        </Form>

    );
}

