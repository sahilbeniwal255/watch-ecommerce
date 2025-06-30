import React from 'react'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row'>
        <div className='w-full h-80 sm:w-1/2 flex items-center justify-center bg-black text-white lg:h-[450px]'>
            <hr className='bg-white w-20'></hr>
            <h1>OUR LATEST COLLECTIONS</h1>
            <hr className='bg-white w-80'></hr>
            <p className='absolute top-[370px] left-4 lg:top-[495px]'>SHOP NOW</p>
        </div>
        <img src = './src/assets/hero.jpg' className='sm:w-1/2 w-full h-80 lg:h-[450px]'/>
    </div>
  )
}

export default Hero