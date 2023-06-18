import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const PentagonGraph = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    // 차트에 사용할 데이터
    const data = {
      labels: ['표정', '시선', '자세', '평균 말속도', '추임새'],
      datasets: [
        {
          data: [5, 8, 15, 11, 13], // 각 레이블에 대한 값
          backgroundColor: 'rgba(0, 123, 255, 0.4)', // 데이터 영역의 배경색
          borderColor: 'rgba(0, 123, 255, 1)', // 데이터 영역의 테두리 색상
          borderWidth: 2, // 데이터 영역의 테두리 너비
          pointBackgroundColor: 'rgba(0, 123, 255, 1)', // 데이터 포인트의 배경색
          pointBorderColor: '#fff', // 데이터 포인트의 테두리 색상
          pointRadius: 4, // 데이터 포인트의 반지름
          pointHoverRadius: 6, // 데이터 포인트의 호버 반지름
        },
      ],
    };

    // 차트에 대한 옵션
    const chartOptions = {
      elements: {
        line: {
          borderWidth: 2, // 데이터 포인트를 연결하는 선의 테두리 너비
          borderColor: 'orange', // 선의 색상
        },
        point: {
          pointBackgroundColor: 'orange', // 데이터 포인트의 배경색
        },
      },
      scales: {
        r: {
          ticks: {
            stepSize: 5, // 반경 축의 눈금 간격
            display: false, // 눈금을 표시할지 여부
            callback: function (value) {
              if (value === 0 || value === 20) {
                return value.toString(); // 0과 20은 그대로 표시, 나머지 값은 빈 문자열로 변환
              } else {
                return ''; // 나머지 값은 표시하지 않음
              }
            },
          },
          grid: {
            color: 'rgba(158, 158, 158, 0.6)', // 그리드 선의 색상
          },
          pointLabels: {
            font: {
              size: 12, // 데이터 포인트의 레이블에 대한 폰트 크기
              weight: '700', // 레이블의 폰트 굵기
              family: 'Pretendard', // 레이블의 폰트 패밀리
            },
            color: 'black', // 레이블의 색상
          },
          angleLines: {
            display: false, // 차트 중심에서 데이터 포인트로 이어지는 선을 표시할지 여부
          },
          suggestedMin: 0, // 반경 축의 최소값
          suggestedMax: 20, // 반경 축의 최대값
        },
      },
      plugins: {
        legend: {
          display: false, // 차트 범례를 표시할지 여부
        },
      },
      animation: {
        duration: 0, // 차트 렌더링에 대한 애니메이션 지속 시간 (비활성화됨)
      },
    };

    // 제공된 데이터와 옵션을 사용하여 차트 생성
    const chart = new Chart(chartRef.current, {
      type: 'radar', // 차트 종류
      data: data, // 차트에 사용할 데이터
      options: chartOptions, // 차트 옵션
    });

    // 컴포넌트가 언마운트될 때 차트를 제거하기 위한 클린업 함수
    return () => {
      chart.destroy();
    };
  }, []); // 빈 의존성 배열은 이펙트가 컴포넌트 마운트 시에만 실행되도록 보장합니다.

  return (
    
    <canvas ref={chartRef} /> 
    
  );
};

export default PentagonGraph;
