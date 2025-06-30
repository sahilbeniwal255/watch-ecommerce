import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Policy from '../components/Policy'
import Newsletter from '../components/Newsletter'
import VideoComp from '../components/VideoComp'
import Videofoot from '../components/videofoot'

const Home = () => {
  return (
    <div>
      <Hero/>
      <VideoComp/>
      <LatestCollection/>
      <Videofoot/>
      <Policy/>
      <Newsletter/>
    </div>
  )
}

export default Home