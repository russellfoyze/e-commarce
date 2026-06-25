import React, { useState, useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { ShopContext } from '../context/shopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/relatedProducts';
const product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart, backendURL, navigate } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')
  const [showBuyNow, setShowBuyNow] = useState(false)
  const [customerName, setCustomerName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('cod')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)



 
  const fetchProductData = async ()=> {

    products.map((item)=> {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0])
       
        return null;
        
        
      }
      
    })

  }

  useEffect (()=>{
    fetchProductData();
  },[productId , products])

  const buildBuyNowOrder = () => ({
    customerName: customerName.trim(),
    phone: phone.trim(),
    address: address.trim(),
    paymentMethod,
    items: [
      {
        productId: productData._id,
        name: productData.name,
        size,
        quantity: 1,
        price: productData.price,
        subtotal: productData.price,
        image: productData.image?.[0] || '',
      },
    ],
    totalAmount: productData.price,
  })

  const handleBuyNowSubmit = async () => {
    setError('')
    if (!size) {
      setError('Please select a size before buying now.')
      return
    }
    if (!customerName || !phone || !address) {
      setError('Please fill in all order details.')
      return
    }

    setLoading(true)
    try {
      const response = await axios.post(backendURL + '/api/order/create', buildBuyNowOrder())
      if (response.data.success) {
        setShowBuyNow(false)
        navigate('/orders')
      } else {
        setError(response.data.message || 'Failed to place order.')
      }
    } catch (err) {
      setError(err.message || 'Failed to place order.')
    } finally {
      setLoading(false)
    }
  }

 
  return productData? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* --------------------Product Data ---------------------*/}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
      {/* --------------------Product Image-------------------- */}
      <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
        <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full '>
        {
          productData.image.map((item, index)=>(
            <img onClick={()=>setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shirnk-0 cursor-pointer' alt="" />
          ))
        }
        </div>
        <div className='w-full sm:w-[80%]'>
        <img src={image} className='w-full h-auto' alt="" />
        </div>
        
      </div >
        {/* -----------------------------product info---------------- */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          <img src={assets.star_icon} alt="" className="w-3 5" />
          
          </div>
          <p className='mt-5 text-2xl font-medium line-through'>{currency}{productData.discount}</p>
          <p className='mt-2 text-3xl font-medium'>{currency}{productData.price}</p>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
              <p>100% Quality  Product</p>
              <p>Cash on delivery</p>
              <p>Easy return policy(Defected product)</p>
          </div>
          
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item , index)=>(
                  <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size? 'border-orange-500' : ''} `} key={index}>{item}</button>
                ))
              }
            </div>
            {!size && <p className='text-sm text-red-600'>Please select a size to continue.</p>}
          </div>
          <div className='flex flex-wrap gap-3 items-center'>
            <button disabled={!size} onClick={() => addToCart(productData._id, size)} className={`px-8 py-3 text-sm ${!size ? 'cursor-not-allowed bg-slate-400 text-slate-200' : 'bg-black text-white active:bg-gray-700'}`}>
              Add To Cart
            </button>
            <button disabled={!size} onClick={() => setShowBuyNow(true)} className={`px-8 py-3 text-sm ${!size ? 'cursor-not-allowed bg-slate-400 text-slate-200' : 'bg-orange-500 text-white active:bg-orange-600'}`}>
              Buy Now
            </button>
          </div>
          <hr className='mt-8 sm:w-4/5' />
          
        </div>
      </div>
      {/* ---------------Discription and review----------------- */}
      <div className='mt-5'>
        <div className='flex lg:justify-start justify-center'>
          <b className='border px-5 py-3 text-sm'>Description</b>
         

        </div>
              <div className='flex flex-col gap-4 border px-6 py-6 text-m text-gray-500'>
              <pre className='text-center lg:text-left mt-2 ld:text-center text-gray-500 md:w-4/5'>{productData.description}</pre>
              </div>

      </div>
              {/*---------------------- Display related Products-------------- */}
              <RelatedProducts   category={productData.category} subCategory={productData.subCategory}/>

      {showBuyNow && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'>
          <div className='w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl'>
            <div className='flex items-start justify-between gap-4'>
              <div>
                <p className='text-sm uppercase tracking-[0.3em] text-slate-500'>Quick checkout</p>
                <h2 className='text-2xl font-semibold text-slate-900'>Buy now for {productData.name}</h2>
                <p className='mt-1 text-sm text-slate-500'>Selected size: <span className='font-semibold text-slate-900'>{size || 'None'}</span></p>
              </div>
              <button onClick={() => setShowBuyNow(false)} className='text-slate-400 hover:text-slate-700'>Close</button>
            </div>

            <div className='mt-6 grid gap-4'>
              <input
                className='border border-slate-300 rounded py-2 px-3 w-full'
                placeholder='Your Name'
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
              <input
                className='border border-slate-300 rounded py-2 px-3 w-full'
                placeholder='Phone Number'
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <textarea
                className='border border-slate-300 rounded py-2 px-3 w-full'
                rows='4'
                placeholder='Full Address'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <div className='flex gap-3'>
                <button type='button' onClick={() => setPaymentMethod('cod')} className={`flex-1 rounded-lg border px-4 py-3 text-sm ${paymentMethod === 'cod' ? 'border-black bg-slate-100' : 'border-slate-300 bg-white'}`}>
                  Cash on delivery
                </button>
                <button type='button' onClick={() => setPaymentMethod('bkash')} className={`flex-1 rounded-lg border px-4 py-3 text-sm ${paymentMethod === 'bkash' ? 'border-black bg-slate-100' : 'border-slate-300 bg-white'}`}>
                  bKash
                </button>
              </div>
              {error && <p className='text-red-600 text-sm'>{error}</p>}
              <div className='mt-4 flex flex-col gap-3 sm:flex-row sm:justify-end'>
                <button type='button' onClick={() => setShowBuyNow(false)} className='rounded-lg border border-slate-300 px-5 py-3 text-sm text-slate-600 hover:bg-slate-100'>Cancel</button>
                <button type='button' onClick={handleBuyNowSubmit} disabled={loading} className='rounded-lg bg-black px-5 py-3 text-sm text-white hover:bg-slate-800'>
                  {loading ? 'Processing...' : 'Confirm Purchase'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  ) : <div className='opacity-0'></div>
}

export default product
