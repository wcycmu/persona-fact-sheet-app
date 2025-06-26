
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="bg-red-700/30 border border-red-500 text-red-300 px-4 py-3 rounded-lg relative my-6 shadow-md" role="alert">
      <strong className="font-bold text-red-200">Error: </strong>
      <span className="block sm:inline">{message}</span>
    </div>
  );
};
