import React from 'react';

interface GlobalSpinnerProps {
  show: boolean;
}

const GlobalSpinner: React.FC<GlobalSpinnerProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
    </div>
  );
};

export default GlobalSpinner;