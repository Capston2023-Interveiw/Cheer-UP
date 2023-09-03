import React from 'react';
import Visualization_Speed from '../Components/Visualization_Speed';




export default function Test(){
    const inputData = [60];

    return (
      <div>
        <h1>Graph Example</h1>
        <Visualization_Speed inputData={inputData} />
      </div>
    );
  }
  
    