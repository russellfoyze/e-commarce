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
        <p>Welcome to our e-commerce store, where quality meets style. We are dedicated to providing you with the best shopping experience, offering a wide range of products that cater to your needs and preferences.</p>
        <p>Our mission is to bring you the latest trends and high-quality products at competitive prices. We carefully curate our collection to ensure that every item meets our standards of excellence.</p>
        <p>With years of experience in the industry, we understand what our customers want. We strive to maintain the highest standards of customer service, ensuring that your shopping experience is smooth, enjoyable, and satisfying.</p>
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
