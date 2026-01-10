import React from 'react';

interface ButtonSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'white' | 'gray' | 'black';
}

const ButtonSpinner: React.FC<ButtonSpinnerProps> = ({ 
  size = 'sm', 
  color = 'white' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8'
  };

  const colorClasses = {
    white: 'border-white',
    gray: 'border-gray-500',
    black: 'border-gray-900'
  };

  return (
    <div 
      className={`
        inline-block animate-spin rounded-full 
        border-2 border-solid 
        border-t-transparent
        ${sizeClasses[size]}
        ${colorClasses[color]}
      `}
    />
  );
};

export default ButtonSpinner;
