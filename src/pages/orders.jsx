import React, { useEffect, useState } from 'react'
import Title from '../components/title'

const Orders = () => {
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const savedOrder = localStorage.getItem('lastOrder')
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder))
      } catch (error) {
        console.error('Failed to parse lastOrder:', error)
      }
    }
  }, [])

  if (!order) {
    return (
      <div className='border-t pt-16'>
        <div className='text-2xl mb-6'>
          <Title text1={'Your'} text2={'Orders'} />
        </div>
        <div className='text-gray-600'>No recent order found. Place an order first to see it here.</div>
      </div>
    )
  }

  return (
    <div className='border-t pt-16'>
      <div className='text-2xl mb-6'>
        <Title text1={'Your'} text2={'Orders'} />
      </div>
      <div className='bg-white border rounded-lg p-6 shadow-sm'>
        <div className='mb-5 grid gap-4 md:grid-cols-2'>
          <div>
            <p className='text-sm text-gray-500'>Order ID</p>
            <p className='font-semibold break-all'>{order._id}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Placed on</p>
            <p>{new Date(order.createdAt).toLocaleString()}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Customer</p>
            <p>{order.customerName}</p>
          </div>
          <div>
            <p className='text-sm text-gray-500'>Phone</p>
            <p>{order.phone}</p>
          </div>
        </div>

        <div className='mb-5 rounded-lg border border-gray-200 bg-slate-50 p-4'>
          <p className='text-sm text-gray-500'>Delivery address</p>
          <p>{order.address}</p>
        </div>

        <div className='mb-5'>
          <p className='text-sm text-gray-500 mb-3'>Order items</p>
          <div className='space-y-4'>
            {order.items.map((item) => (
              <div key={`${item.productId}-${item.size}`} className='grid gap-3 rounded-lg border border-gray-200 p-4 sm:grid-cols-[2fr_1fr_1fr]'>
                <div>
                  <p className='font-medium'>{item.name}</p>
                  <p className='text-sm text-gray-500'>Product ID: {item.productId}</p>
                </div>
                <div>
                  <p className='text-sm'>Size: {item.size}</p>
                  <p className='text-sm'>Qty: {item.quantity}</p>
                </div>
                <div className='text-right'>
                  <p className='text-sm'>Price: ৳{item.price}</p>
                  <p className='font-medium'>Subtotal: ৳{item.subtotal}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='grid gap-3 md:grid-cols-2'>
          <div className='rounded-lg border border-gray-200 bg-slate-50 p-4'>
            <p className='text-sm text-gray-500'>Payment method</p>
            <p className='font-semibold'>{order.paymentMethod}</p>
          </div>
          <div className='rounded-lg border border-gray-200 bg-slate-50 p-4'>
            <p className='text-sm text-gray-500'>Order total</p>
            <p className='font-semibold'>৳{order.totalAmount}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Orders
