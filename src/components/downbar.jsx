import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/shopContext'
import { useContext } from 'react'
import { assets } from '../assets/assets'

const Downbar = () => {
    const { getCartCount } = useContext(ShopContext)
    const location = useLocation()
    const isActive = (path) => location.pathname === path
    const cartCount = getCartCount()

    return (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
            <div className="flex justify-around items-center py-2">
                <Link to="/" className={`flex flex-col items-center ${isActive('/') ? 'text-red-600' : 'text-gray-600'}`}>
                    <img src={assets.home_icon} alt="Home" className="w-6 h-6" />
                    <span className="text-xs mt-1 font-bold">Home</span>
                </Link>
                <Link to="/collection" className={`flex flex-col items-center ${isActive('/collection') ? 'text-red-600' : 'text-gray-600'}`}>
                    <img src={assets.search_icon} alt="Search" className="w-6 h-6" />
                    <span className="text-xs mt-1 font-bold">Collection</span>
                </Link>
                <Link to="/cart" className={`flex flex-col items-center relative ${isActive('/cart') ? 'text-red-600' : 'text-gray-600'}`}>
                    <img src={assets.cart_icon} alt="Cart" className="w-6 h-6" />
                    <span className="text-xs mt-1 font-bold">Cart</span>
                    {cartCount > 0 && (
                        <span className={`absolute -top-1 -right-1 text-xs text-white px-1.5 py-0.5 rounded-full font-bold ${cartCount === 0 ? 'bg-black' : 'bg-red-500'}`}>
                            {cartCount}
                        </span>
                    )}
                </Link>
                <Link to="/login" className={`flex flex-col items-center ${isActive('/login') ? 'text-red-600' : 'text-gray-600'}`}>
                    <img src={assets.profile_icon} alt="Profile" className="w-6 h-6" />
                    <span className="text-xs mt-1 font-bold">Profile</span>
                </Link>
            </div>
            <a href="https://wa.me/8801331759272" target="_blank" rel="noopener noreferrer" className="fixed bottom-[74px] right-4 bg-green-500 text-white p-2 rounded-full z-50 shadow-lg">
                <img src={assets.wa} alt="WhatsApp" className="w-6 h-6" />
            </a>
        </div>
    )
}

export default Downbar