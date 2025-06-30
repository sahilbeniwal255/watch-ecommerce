import React, { useState, useEffect, useRef } from 'react';

const Videofoot = () => {

  return (
    <div className="relative lg:h-3/7 w-full aspect-video">
      <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full">
        <source src = '.\src\assets\foot.mp4'/>
      </video>
      <div className="absolute top-0 left-0 z-40 w-full h-full bg-black bg-opacity-50 flex justify-end items-center px-6 md:px-10">
        <h1 className="text-4xl md:text-7xl lg:text-8xl text-white mr-5 md:w-1/3 text-right opacity-90">
          Legacy in Every Tick
        </h1>
      </div>
    </div>
  );
};

export default Videofoot;
