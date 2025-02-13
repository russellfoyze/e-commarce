import React from 'react'
import Title from '../components/title'
import { assets } from '../assets/assets'

const about = () => {
  return (
    <div>
      
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'About'} text2={'Us'}></Title>
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae ullam mollitia in earum, commodi corrupti vel excepturi iure necessitatibus non voluptas impedit expedita illo sit, enim debitis itaque magni sint?</p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque impedit consequuntur dolore inventore commodi, esse aspernatur harum autem necessitatibus?
        </p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore ipsum saepe soluta reiciendis magni, natus temporibus, incidunt ut, optio quam repellat harum vitae. Non provident iure nesciunt quidem magni dolor.</p>
        </div>
      

      </div>
      <div className='text-4xl py-4'>
        <Title text1={'Why'} text2={'Choose us'}></Title>

      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance</b>
          <p className='text-gray-600'>We Meticulously select and vet each produt to ensure it meets out stringent quality standards</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience</b>
          <p className='text-gray-600'>We Meticulously select and vet each produt to ensure it meets out stringent quality standards</p>

        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer service</b>
          <p className='text-gray-600'>We Meticulously select and vet each produt to ensure it meets out stringent quality standards</p>

        </div>

      </div>

    </div>
  )
}

export default about
