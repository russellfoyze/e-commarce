import React, { useContext } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from '../components/title'

const orders = () => {
  const {products , currency} = useContext(ShopContext)
  return (
    <div className='border-t pt-16'>
      <div className='text-2xl'>
        <Title text1={'Your'} text2={'Orders'}/>
      </div>
     <div>
      {
        products.slice(1,4).map((item, index)=>(
          <div key={index} className='py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4'  >
            <div className='flex item-start gap-6 text-sm'>
              <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
              <div>
                <p className='text-base font-medium'>{item.name}</p>
                <div className='flex items-center gap-3 mt-2 text-base text-gray-700'>
                <p className='text-lg'>{currency}{item.price}</p>
                <p>Quantity: 1</p>
                <p>  Size : L</p>
                </div>
                <p className='mt-2'>Date <span className='text-gray-400'>25:jan:2025</span> </p>
              </div>
            </div>
            <div className='md:w-1/2 flex justify-between'>
            <div className='flex item-center gap-2'>
              <p className='min-w-2 h-2 mt-2 rounded-full bg-green-400'></p>
              <p className='text-sm md:text-base'>Ready to ship</p>
            </div>
          <button className='border px-4 py-2 text-sm font-medium rounded-sm'>Track Order</button>

            </div>
          </div>
        ))

      }

     </div>

    </div>
  )
}

export default orders
