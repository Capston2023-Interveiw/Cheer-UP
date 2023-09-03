import React from 'react';
//import Visualization_Speed from '../Components/Visualization_Speed';
import Visualization_Gaze from '../Components/Visualization_Gaze';



export default function Test(){
    const inputData = '왼쪽: 3회, 오른쪽: 3회';

    return (
      <div>
        <h1>Graph Example</h1>
        <Visualization_Gaze inputData={inputData} />
      </div>
    );
  }
  
    