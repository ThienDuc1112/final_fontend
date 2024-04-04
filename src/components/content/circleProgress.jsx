import React, { useEffect, useRef, useState } from "react";

const CircleProgress = ({
  progress,
  size,
  strokeWidth,
  circleColor,
  progressColor,
  annotation,
}) => {
  const [normalizedProgress, setNormalizedProgress] = useState(0);
  const [animationComplete, setAnimationComplete] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const radius = (size - strokeWidth) / 2;
    const centerX = size / 2;
    const centerY = size / 2;
    const startAngle = -Math.PI / 2;
    const endAngle = startAngle + (Math.PI * 2 * progress) / 100;
    let currentAngle = startAngle;

    const animationFrame = () => {
      context.clearRect(0, 0, size, size);
      context.lineWidth = strokeWidth;
      context.strokeStyle = circleColor;
      context.beginPath();
      context.arc(centerX, centerY, radius, 0, Math.PI * 2);
      context.stroke();

      context.strokeStyle = progressColor;
      context.beginPath();
      context.arc(centerX, centerY, radius, startAngle, currentAngle);
      context.stroke();

      currentAngle += (endAngle - startAngle) / 60; // Adjust the divisor to control the animation speed

      if (currentAngle >= endAngle) {
        setAnimationComplete(true);
      } else {
        requestAnimationFrame(animationFrame);
      }
    };

    setNormalizedProgress(Math.min(Math.max(progress, 0), 100));
    setAnimationComplete(false);
    animationFrame();
  }, [progress, size, strokeWidth, circleColor, progressColor]);

  return (
    <div className="circle-progress">
      <canvas ref={canvasRef} width={size} height={size} />
      <div className="circle-progress-text">
        <span className="normalized-progress">{normalizedProgress}</span>%
      </div>
    </div>
  );
};

export default CircleProgress;
