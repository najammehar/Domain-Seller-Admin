import React, { useEffect, useState } from 'react';

const Toast = ({ message, type, onClose, duration = 3000 }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration;

    const updateProgress = () => {
      const now = Date.now();
      const newProgress = ((now - startTime) / duration) * 100;
      
      if (now >= endTime) {
        setProgress(100);
        onClose();
      } else {
        setProgress(newProgress);
        requestAnimationFrame(updateProgress);
      }
    };

    requestAnimationFrame(updateProgress);

    return () => {
      cancelAnimationFrame(updateProgress);
    };
  }, [duration, onClose]);

  const getTextColor = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-blue-500';
    }
  };

  return (
    <div className={`fixed top-8 right-4 overflow-hidden rounded-t-md text-white bg-gray-800 z-50`}>
      <div className={`mb-2 px-4 pt-4 `}>{message}</div>
      <div className="w-full bg-white bg-opacity-30 h-1 ">
        <div
          className={`bg-orange-500 h-full rounded-full ${getTextColor()}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;