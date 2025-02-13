import React from 'react'
import Hero from '../components/hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/bestSeller'
import OurPolicy from '../components/ourPolicy'
import NewsLetterBox from '../components/newsLetterBox.jsx'

const home = () => {
  return (
    <div>
      <Hero/>
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsLetterBox/>

    </div>
  )
}

export default home
