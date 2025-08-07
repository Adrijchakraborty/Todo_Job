import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-t-transparent border-green-500"></div>
    </div>
  );
};

export default Loader;
