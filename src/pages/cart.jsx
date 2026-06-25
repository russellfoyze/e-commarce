import React, { useContext, useEffect, useState } from 'react'
import Title from '../components/title';
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/cartTotal';
import { useNavigate } from 'react-router-dom';

const cart = () => {
  const {products , currency, cartItems, updateQuantity} = useContext(ShopContext);
  const navigate = useNavigate();
  const [cartData , setCartData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  useEffect(()=>{
    const tempData = [];
    for(const items in cartItems){
      for(const item in cartItems[items]){
        if (cartItems[items][item]>0) {
          tempData.push({
            _id:items,
            size:item,
            quantity:cartItems[items][item],
          })
        }
      }
    }
    setCartData(tempData);
  },[cartItems])

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(-1);
    }, 300);
  };

  return (
    <>
      <div 
        className={`fixed top-0 left-0 w-full h-full bg-black transition-opacity duration-300 ${
          isOpen ? 'opacity-50' : 'opacity-0'
        } z-40`}
        onClick={handleClose}
      />
      
      <div 
        className={`fixed top-0 right-0 w-[80%] h-full bg-white z-50 shadow-lg overflow-y-auto transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <div className='text-2xl'>
              <Title text1={'Your'} text2={'Cart'}/>
            </div>
            <button onClick={handleClose} className='text-2xl font-bold hover:text-gray-600'>
              ×
            </button>
          </div>


    
          


          <div>
            {cartData.map((item, index) => {
              const productData = products.find((product) => product._id === item._id);

              return (
                <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center'>
                  <div className='flex items-start gap-6'>
                    <img src={productData.image[0]} className='w-16 sm:w-20' alt="" />
                    <div>
                      <p className='text-l sm:text-lg font-medium'>{productData.name}</p>
                      <div className='flex items-center gap-5 mt-2'>
                        <p className='line-through'>{currency}{productData.discount}</p>
                        <p>{currency}{productData.price}</p>
                        <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <input 
                    onChange={(e) => e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, Number(e.target.value))} 
                    type="number" 
                    min={1} 
                    defaultValue={item.quantity} 
                    className='border max-w-10 px-1 sm:px-2 py-1' 
                  />
                  <img 
                    onClick={() => updateQuantity(item._id, item.size, 0)} 
                    src={assets.bin_icon} 
                    className='w-4 ml-5 cursor-pointer' 
                    alt="Remove item" 
                  />
                </div>
              )
            })}
          </div>

          <div className='flex justify-end my-20'>
            <div className='w-full sm:w-[450px]'>
              <CartTotal/>
              <div className='w-full text-end'>
                <button 
                  onClick={() => navigate('/place-order')} 
                  className='bg-black text-white text-sm my-8 px-8 py-3 hover:bg-gray-800 transition-colors'
                >
                  CHECKOUT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default cart
