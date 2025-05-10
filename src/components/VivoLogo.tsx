import React from 'react';

interface VivoLogoProps {
  size?: number;
}

const VivoLogo: React.FC<VivoLogoProps> = ({ size = 24 }) => {
  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: '#660099', 
        borderRadius: '50%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <div 
        style={{ 
          width: size * 0.4, 
          height: size * 0.6, 
          backgroundColor: 'white', 
          borderRadius: '2px',
          transform: 'rotate(15deg)'
        }}
      ></div>
    </div>
  );
};

export default VivoLogo;