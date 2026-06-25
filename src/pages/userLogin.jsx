import React, { useState, useContext, useEffect } from 'react'
import { ShopContext } from '../context/shopContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const UserLogin = () => {
  const { navigate, backendURL } = useContext(ShopContext)
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const savedPhone = localStorage.getItem('userPhone')
    if (savedPhone) {
      navigate('/user-dashboard')
    }
  }, [])

  const handlePhoneSubmit = async (e) => {
    e.preventDefault()
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number (10 digits)')
      return
    }

    try {
      setLoading(true)
      localStorage.setItem('userPhone', phoneNumber)
      localStorage.setItem('userToken', phoneNumber)
      toast.success('Login successful!')
      navigate('/user-dashboard')
    } catch (error) {
      toast.error(error.message || 'Error logging in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4'>
      <div className='w-full max-w-md bg-white rounded-lg shadow-lg p-8'>
        <div className='text-center mb-8'>
          <h1 className='text-3xl font-bold text-gray-900 mb-2'>Welcome</h1>
          <p className='text-gray-600'>Enter your phone number to continue</p>
        </div>

        <form onSubmit={handlePhoneSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>Phone Number</label>
            <input
              type='tel'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder='Enter your phone number'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent'
              required
            />
            <p className='text-xs text-gray-500 mt-1'>10 digit phone number (e.g., 9876543210)</p>
          </div>

          <button
            type='submit'
            disabled={loading}
            className='w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition'
          >
            {loading ? 'Logging in...' : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserLogin

