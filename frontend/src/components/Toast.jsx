import React, { useEffect } from 'react';

const Toast = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(); 
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 transition-transform duration-500 transform animate-slide-in">
      <div className="bg-green-600 text-white px-4 py-2 rounded shadow-lg text-sm font-medium">
        {message}
      </div>
      <style>
        {`
        @keyframes slideIn {
          0% { transform: translateX(100%); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in {
          animation: slideIn 0.3s ease-out;
        }
      `}
      </style>
    </div>
  );
};

export default Toast;
