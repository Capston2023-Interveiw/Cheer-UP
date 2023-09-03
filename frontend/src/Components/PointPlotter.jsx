import React, { useState, useEffect } from 'react';

const PointPlotter = ({ left, right }) => {
  const [points, setPoints] = useState([]);

  // 2, 3 사분면 좌표를 생성하는 함수
  const generateRandomCoordinateForQuadrant2And3 = () => {
    const x = Math.random() * 3 - 8; // -8에서 -5 사이의 난수 생성
    const y = Math.random() * 16 - 8; // -8에서 8 사이의 난수 생성
    return { x, y };
  };

  // 1, 4 사분면 좌표를 생성하는 함수
  const generateRandomCoordinateForQuadrant1And4 = () => {
    const x = Math.random() * 3 + 5; // 5에서 8 사이의 난수 생성
    const y = Math.random() * 16 - 8; // -8에서 8 사이의 난수 생성
    return { x, y };
  };

  useEffect(() => {
    const newPoints = [];

    // left 횟수만큼 2, 3 사분면에 랜덤으로 점을 찍는다.
    for (let i = 0; i < left; i++) {
      let point = generateRandomCoordinateForQuadrant2And3();
      newPoints.push({ ...point, color: 'rgba(0, 123, 255, 1)' });
    }

    // right 횟수만큼 1, 4 사분면에 랜덤으로 점을 찍는다.
    for (let i = 0; i < right; i++) {
      let point = generateRandomCoordinateForQuadrant1And4();
      newPoints.push({ ...point, color: 'rgba(0, 123, 255, 1)' });
    }

    setPoints(newPoints);
  }, [left, right]);

  return (
    <div>
        <svg width="240" height="240" >
        {/* x축 */}
        <line x1="0" y1="120" x2="240" y2="120" stroke="#000" strokeWidth="1" />

        {/* y축 */}
        <line x1="120" y1="0" x2="120" y2="240" stroke="#000" strokeWidth="1" />

        {/* 점들을 표시. */}
        {points.map((point, index) => (
            <circle
            key={index}
            cx={(point.x + 10) * 12} // 좌표를 화면에 맞게 변환
            cy={(10 - point.y) * 12} // 좌표를 화면에 맞게 변환
            r="4" // 점의 반지름
            fill={point.color} // 점의 색상
            />
        ))}
        </svg>
    </div>
  );
};

export default PointPlotter;
