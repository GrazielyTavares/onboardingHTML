import React from 'react';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
      <div 
        className="h-full bg-purple-600 rounded-full transition-all duration-500 ease-in-out" 
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;