import React, { useState, useEffect } from 'react';

const VideoComp = () => {

  return (
    <div className="relative w-full lg:h-2s/5 aspect-video overflow-hidden">
      <video autoPlay loop muted  className="absolute top-0 left-0 w-full h-auto">
        <source src = './src/assets/head.mp4'/>
      </video>
      <div className="absolute top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex justify-end items-center px-6 md:px-10">
        <h1 className="text-4xl w-1/2 text-wrap md:text-7xl lg:text-8xl text-white md:w-1/3 text-right opacity-90">
          NOT JUST A WATCH BUT CLASS
        </h1>
      </div>
    </div>
  );
};

export default VideoComp;
