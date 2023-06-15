import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const PentagonGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['표정', '시선', '자세', '평균 말속도', '추임새'],
      datasets: [
        {
          data: [5, 8, 15, 11, 13], 
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
                return value.toString(); // 0과 20은 그대로 표시
              } else {
                return ''; // 나머지 값은 표시하지 않음
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
      data: data,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default PentagonGraph;
