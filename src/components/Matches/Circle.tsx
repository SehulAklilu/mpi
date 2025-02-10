import React from "react";

interface CircleWithArcProps {
  deg?: number; // Angle of the arc in degrees
}

const CircleWithArc: React.FC<CircleWithArcProps> = ({ deg = 4 }) => {
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const arcLength = (circumference * deg) / 360;

  return (
    <div className="relative flex items-center justify-center w-24 h-24">
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute">
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="red"
          strokeWidth="4"
        />
      </svg>
      <svg width="100" height="100" viewBox="0 0 100 100" className="absolute">
        <path
          d={`M 50 10 A 40 40 0 ${deg > 180 ? 1 : 0} 1 ${50 + 40 * Math.sin((deg * Math.PI) / 180)} ${50 - 40 * Math.cos((deg * Math.PI) / 180)}`}
          fill="none"
          stroke="red"
          strokeWidth="4"
        />
      </svg>
    </div>
  );
};

export default CircleWithArc;