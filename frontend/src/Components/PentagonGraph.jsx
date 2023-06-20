import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const PentagonGraph = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (data.length === 0) {
      return;
    }
    const analysisTypeMap = {
      face: '표정',
      posture: '자세',
      gaze: '시선',
      interjection: '추임새',
      speed: '말속도'
  };
    const labels = data.map(item => analysisTypeMap[item.analysis_type]);
    const scores = data.map(item => item.score);

    const chartData = {
      labels: labels,
      datasets: [
        {
          data: scores,
          backgroundColor: 'rgba(0, 123, 255, 0.4)',
          borderColor: 'rgba(0, 123, 255, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(0, 123, 255, 1)',
          pointBorderColor: '#fff',
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    };

    
    const chartOptions = {
      elements: {
        line: {
          borderWidth: 2, 
          borderColor: 'orange', 
        },
        point: {
          pointBackgroundColor: 'orange', 
        },
      },
      scales: {
        r: {
          ticks: {
            stepSize: 5, 
            display: false, 
            callback: function (value) {
              if (value === 0 || value === 20) {
                return value.toString(); 
              } else {
                return ''; 
              }
            },
          },
          grid: {
            color: 'rgba(158, 158, 158, 0.6)', 
          },
          pointLabels: {
            font: {
              size: 12, 
              weight: '700', 
              family: 'Pretendard',
            },
            color: 'black', 
          },
          angleLines: {
            display: false, 
          },
          suggestedMin: 0,
          suggestedMax: 20,
        },
      },
      plugins: {
        legend: {
          display: false, 
        },
      },
      animation: {
        duration: 0, 
      },
    };

    
    const chart = new Chart(chartRef.current, {
      type: 'radar', 
      data: chartData, 
      options: chartOptions, 
    });

    
    return () => {
      chart.destroy();
    };
  }, [data]); 

  return (
    
    <canvas ref={chartRef} /> 
    
  );
};

export default PentagonGraph;
