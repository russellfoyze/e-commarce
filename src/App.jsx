import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/home";
import About from "./pages/about";
import Login from "./pages/login";
import Contact from "./pages/contact";
import Cart from "./pages/cart";
import Orders from "./pages/orders";
import Collection from "./pages/collection";
import PlaceOrder from "./pages/placeOrder";
import Product from "./pages/product";
import UserLogin from "./pages/userLogin";
import UserDashboard from "./pages/userDashboard";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import SearchBar from './components/searchBar'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/ReactToastify.css'
import Downbar from "./components/downbar";

const App = () => {
  const location = useLocation();
  const isCartPage = location.pathname === '/cart';

  return (
    <div className="relative">
      <div className={`${isCartPage ? 'w-[20%]' : 'w-full'} px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]`}>
      <ToastContainer /> 
      <Navbar />
      
      <SearchBar/>
     
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={null} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/place-order" element={<PlaceOrder />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
      </Routes>

      <Footer />
      <Downbar/>
      </div>

      {isCartPage && <Cart />}
    </div>
  );
};

export default App;
