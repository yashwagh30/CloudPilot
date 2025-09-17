import { motion } from "framer-motion";
import { memo } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}

function SparklineComponent({ 
  data, 
  width = 60, 
  height = 20, 
  color = "hsl(var(--primary))",
  className = "" 
}: SparklineProps) {
  if (!data || data.length < 2) {
    return <div className={`w-[${width}px] h-[${height}px] ${className}`} />;
  }

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Create path points
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');

  // Create smooth curve path
  const pathData = data.reduce((path, value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    
    if (index === 0) {
      return `M ${x} ${y}`;
    }
    
    const prevX = ((index - 1) / (data.length - 1)) * width;
    const prevY = height - ((data[index - 1] - min) / range) * height;
    
    const cpX = (prevX + x) / 2;
    return `${path} Q ${cpX} ${prevY} ${x} ${y}`;
  }, '');

  const isPositiveTrend = data[data.length - 1] > data[0];

  return (
    <div className={`inline-block ${className}`}>
      <svg width={width} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`sparkline-gradient-${width}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        
        {/* Fill area */}
        <motion.path
          d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
          fill={`url(#sparkline-gradient-${width})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
        
        {/* Line */}
        <motion.path
          d={pathData}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />
        
        {/* End point */}
        <motion.circle
          cx={data.length > 1 ? ((data.length - 1) / (data.length - 1)) * width : 0}
          cy={data.length > 1 ? height - ((data[data.length - 1] - min) / range) * height : height / 2}
          r="2"
          fill={color}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 1 }}
        />
      </svg>
    </div>
  );
}

export const Sparkline = memo(SparklineComponent);