import React from 'react';
//import Visualization_Speed from '../Components/Visualization_Speed';
import Visualization_Face from '../Components/Visualization_Face';



export default function Test(){
    const inputData = '긍정적인 표정: 12회, 부정적인 표정: 25회';

    return (
      <div>
        <h1>Graph Example</h1>
        <Visualization_Face inputData={inputData} />
      </div>
    );
  }
  
    