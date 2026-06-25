import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserDashboard = () => {
  const { navigate, backendURL } = useContext(ShopContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [showDetails, setShowDetails] = useState(false)
  const userPhone = localStorage.getItem('userPhone')

  useEffect(() => {
    if (!userPhone) {
      navigate('/user-login')
      return
    }
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const response = await axios.get(backendURL + '/api/user/orders', {
        headers: { 'x-phone': userPhone }
      })
      if (response.data.success) {
        setOrders(response.data.orders || [])
      } else {
        toast.error(response.data.message || 'Failed to load orders')
      }
    } catch (error) {
      toast.error(error.message || 'Error fetching orders')
    } finally {
      setLoading(false)
    }
  }

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) return

    try {
      const response = await axios.post(
        backendURL + '/api/user/cancel-order',
        { orderId },
        { headers: { 'x-phone': userPhone } }
      )
      if (response.data.success) {
        toast.success('Order cancelled successfully')
        fetchOrders()
        setShowDetails(false)
      } else {
        toast.error(response.data.message || 'Failed to cancel order')
      }
    } catch (error) {
      toast.error(error.message || 'Error cancelling order')
    }
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'done':
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'pending':
        return 'bg-blue-100 text-blue-800 border-blue-300'
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-300'
      case 'returned':
        return 'bg-purple-100 text-purple-800 border-purple-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'done':
      case 'delivered':
      case 'completed':
        return '✓'
      case 'pending':
        return '⏳'
      case 'cancelled':
        return '✕'
      case 'returned':
        return '↺'
      default:
        return '?'
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('userPhone')
    localStorage.removeItem('userToken')
    toast.success('Logged out successfully')
    navigate('/user-login')
  }

  return (
    <div className='border-t'>
      {/* Header */}
      <div className='bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-8 px-4 -mx-4 sm:-mx-[5vw] md:-mx-[7vw] lg:-mx-[9vw]'>
        <div className='max-w-6xl mx-auto flex justify-between items-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
          <div>
            <h1 className='text-3xl font-bold mb-2'>My Orders</h1>
            <p className='text-indigo-100'>Track and manage your orders</p>
          </div>
          <button
            onClick={handleLogout}
            className='bg-white text-indigo-600 px-6 py-2 rounded-lg font-semibold hover:bg-indigo-50 transition'
          >
            Logout
          </button>
        </div>
      </div>

      <div className='py-12'>
        {/* Stats Overview */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 mb-12'>
          <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
            <div className='text-3xl font-bold text-blue-600 mb-2'>{orders.length}</div>
            <p className='text-gray-600 text-sm'>Total Orders</p>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
            <div className='text-3xl font-bold text-green-600 mb-2'>
              {orders.filter(o => ['done', 'delivered', 'completed'].includes(o.status?.toLowerCase())).length}
            </div>
            <p className='text-gray-600 text-sm'>Delivered</p>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
            <div className='text-3xl font-bold text-blue-500 mb-2'>
              {orders.filter(o => o.status?.toLowerCase() === 'pending').length}
            </div>
            <p className='text-gray-600 text-sm'>In Progress</p>
          </div>
          <div className='bg-white rounded-lg shadow-md p-6 border border-gray-200'>
            <div className='text-3xl font-bold text-red-600 mb-2'>
              {orders.filter(o => ['cancelled', 'returned'].includes(o.status?.toLowerCase())).length}
            </div>
            <p className='text-gray-600 text-sm'>Cancelled</p>
          </div>
        </div>

        {/* Orders List */}
        {loading ? (
          <div className='text-center py-12'>
            <div className='inline-block'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600'></div>
            </div>
            <p className='text-gray-600 mt-4'>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div className='bg-white rounded-lg shadow-md p-12 text-center border border-gray-200'>
            <div className='text-5xl mb-4'>📦</div>
            <h3 className='text-xl font-semibold text-gray-800 mb-2'>No orders yet</h3>
            <p className='text-gray-600'>Start shopping to see your orders here!</p>
          </div>
        ) : (
          <div className='space-y-6'>
            {orders.map((order) => (
              <div key={order._id} className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition border border-gray-200'>
                <div className='bg-gradient-to-r from-indigo-50 to-blue-50 border-l-4 border-indigo-600 p-6'>
                  <div className='grid grid-cols-1 md:grid-cols-5 gap-4 items-center'>
                    <div>
                      <p className='text-gray-500 text-sm'>Order ID</p>
                      <p className='font-semibold text-gray-900 font-mono text-sm'>{order._id?.slice(-8)}</p>
                    </div>
                    <div>
                      <p className='text-gray-500 text-sm'>Date</p>
                      <p className='font-semibold text-gray-900'>{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className='text-gray-500 text-sm'>Amount</p>
                      <p className='font-semibold text-gray-900'>৳{order.totalAmount}</p>
                    </div>
                    <div>
                      <p className='text-gray-500 text-sm'>Items</p>
                      <p className='font-semibold text-gray-900'>{order.items?.length || 0} item(s)</p>
                    </div>
                    <div className={`px-4 py-2 rounded-lg border font-semibold flex items-center justify-center ${getStatusColor(order.status)}`}>
                      <span className='text-xl mr-2'>{getStatusIcon(order.status)}</span>
                      {order.status}
                    </div>
                  </div>
                </div>

                <div className='p-6'>
                  {order.items && order.items.length > 0 && (
                    <div className='mb-6'>
                      <h4 className='font-semibold text-gray-900 mb-3'>Items</h4>
                      <div className='space-y-2'>
                        {order.items.slice(0, 2).map((item, idx) => (
                          <div key={idx} className='flex justify-between items-center text-sm'>
                            <span className='text-gray-700'>{item.name} <span className='text-gray-500'>x{item.quantity}</span></span>
                            <span className='font-semibold'>৳{item.price * item.quantity}</span>
                          </div>
                        ))}
                        {order.items.length > 2 && (
                          <p className='text-gray-500 text-sm'>+{order.items.length - 2} more items</p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className='flex gap-4'>
                    <button
                      onClick={() => {
                        setSelectedOrder(order)
                        setShowDetails(true)
                      }}
                      className='flex-1 bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition'
                    >
                      View Details
                    </button>
                    {['pending'].includes(order.status?.toLowerCase()) && (
                      <button
                        onClick={() => handleCancelOrder(order._id)}
                        className='flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition'
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto'>
            <div className='bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 flex justify-between items-center'>
              <h2 className='text-2xl font-bold'>Order Details</h2>
              <button
                onClick={() => setShowDetails(false)}
                className='text-2xl hover:opacity-70'
              >
                ✕
              </button>
            </div>

            <div className='p-6 space-y-6'>
              {/* Order Info */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <p className='text-gray-500 text-sm mb-1'>Order ID</p>
                  <p className='font-semibold text-gray-900'>{selectedOrder._id}</p>
                </div>
                <div>
                  <p className='text-gray-500 text-sm mb-1'>Status</p>
                  <div className={`inline-block px-4 py-2 rounded-lg border font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </div>
                </div>
                <div>
                  <p className='text-gray-500 text-sm mb-1'>Date</p>
                  <p className='font-semibold text-gray-900'>{new Date(selectedOrder.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className='text-gray-500 text-sm mb-1'>Payment Method</p>
                  <p className='font-semibold text-gray-900'>{selectedOrder.paymentMethod}</p>
                </div>
              </div>

              {/* Delivery Address */}
              <div className='bg-gray-50 p-4 rounded-lg'>
                <p className='text-gray-500 text-sm mb-2'>Delivery Address</p>
                <p className='text-gray-900'>{selectedOrder.address}</p>
              </div>

              {/* Items */}
              <div>
                <p className='font-semibold text-gray-900 mb-3'>Order Items</p>
                <div className='space-y-3'>
                  {selectedOrder.items?.map((item, idx) => (
                    <div key={idx} className='border-l-2 border-indigo-200 pl-4'>
                      <p className='font-semibold text-gray-900'>{item.name}</p>
                      <div className='text-sm text-gray-600 mt-1'>
                        <p>Size: {item.size}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p className='font-semibold text-gray-900 mt-1'>৳{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className='bg-gradient-to-r from-indigo-50 to-blue-50 p-4 rounded-lg'>
                <div className='flex justify-between items-center'>
                  <p className='text-lg font-semibold text-gray-900'>Total Amount</p>
                  <p className='text-2xl font-bold text-indigo-600'>৳{selectedOrder.totalAmount}</p>
                </div>
              </div>

              {/* Actions */}
              <div className='flex gap-4'>
                {['pending'].includes(selectedOrder.status?.toLowerCase()) && (
                  <button
                    onClick={() => {
                      handleCancelOrder(selectedOrder._id)
                    }}
                    className='flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition'
                  >
                    Cancel Order
                  </button>
                )}
                <button
                  onClick={() => setShowDetails(false)}
                  className='flex-1 bg-gray-200 text-gray-900 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition'
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserDashboard
