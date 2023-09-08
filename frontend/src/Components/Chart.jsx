import React, {PureComponent}  from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  } from 'recharts';
  
  const data = [
    {
      name: '2022.11.20', score: 50, 
    },
    {
      name: '2023.02.20', score: 30, 
    },
    {
      name: '2023.04.02', score: 80, 
    },
    {
      name: '2023.12.03', score: 50, 
    },
  ];


  
  export default class Chart extends PureComponent {

    render() {
      return (
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      );
    }
  }