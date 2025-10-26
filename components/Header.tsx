import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-bf-gray-800/70 backdrop-blur-sm border-b border-bf-gray-700 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-widest font-teko uppercase">
              Battlefield 6 <span className="text-bf-orange">//</span> Meme Generator
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};
