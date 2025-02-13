import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/shopContext'
import Title from './title'

const cartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    const [selectedFee, setSelectedFee] = useState(80); 

    const handleFeeChange = (e) => {
        setSelectedFee(e.target.value === 'dhaka' ? 80 : 130);
    };


  return (
    <div className='w-full'>
        <div className='text-2xl'>
            <Title text1 ={'Cart'} text2={'Total'}/>

        </div>
        <div className='flex flex-col gap-2 mt-2 text-sm'>
            <div className='flex justify-between'> 
                <p>Subtotal</p>
                <p>{currency}{getCartAmount()}</p>

            </div>
            <hr />
            <div className='flex justify-between'>
                <p>Delivery Fee</p>
                <select onChange={handleFeeChange}>
                        <option value='dhaka'>Dhaka</option>
                        <option value='outsideDhaka'>Outside Dhaka</option>
                    </select>
                    <p>{currency}{selectedFee}</p>
                </div>
                <hr />
                <div className='flex justify-between'>
                    <b>Total</b>
                    <b>{currency}{getCartAmount() === 0 ? 0 :getCartAmount() + selectedFee}</b>

            </div>

        </div>
      
    </div>
  )
}

export default cartTotal
