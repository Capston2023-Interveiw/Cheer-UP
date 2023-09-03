import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DonutChart = ({ positive, negative }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      // 이전 차트 파괴
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext('2d');
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['긍정적 표정', '부정적 표정'],
          datasets: [
            {
              data: [positive, negative],
              backgroundColor: ['#0084FE', '#FF1A1A'],
            },
          ],
        },
        options: {
          cutout: '80%',
          responsive: true,
          maintainAspectRatio: false,
        },
      });
    }
  }, [positive, negative]);

  return (
 
      <canvas ref={chartRef} width="200" height="200"></canvas>

  );
};

export default DonutChart;
