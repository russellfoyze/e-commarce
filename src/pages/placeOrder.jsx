import React, { useContext, useState } from "react";
import Title from "../components/title";
import CartTotal from "../components/cartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/shopContext";

const placeOrder = () => {
  const [method, setMethod] = useState("cod");
  const {navigate} = useContext(ShopContext)



  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  border-t">
      {/* -------------left Side------------ */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivary"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Your Name"
            type="text"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone Number"
        />
        <textarea
          className="border border-gray-300 rounded py-2 px-3.5 w-full"
          rows="4"
          placeholder="Full Address"
        ></textarea>
      </div>
      {/*----------------Right Side --------------- */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        {/* -------------Payment Method-------------- */}
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          <div className="flex gap-3 flex-row lg:flex-row">
            <div onClick={()=> setMethod('bkash')} className={`flex items-center gap-3 border p-2 px=3 cursor-pointer`}>
            <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'bkash'? "bg-green-500": '' }`}></p>
              <img className="h-5 mx-4" src={assets.bkash} alt="" />
            </div>
            <div onClick={()=> setMethod('cod')} className={`flex items-center gap-3 border p-2 px=3 cursor-pointer `}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod'? "bg-green-500": '' }`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>
          
          <div className="w-full text-end mt-8">
            <button onClick={()=>navigate('/orders')} className="bg-black text-white px-16 py-3 text-sm">Place Order</button>

          </div>


        </div>
      </div>
    </div>
  );
};

export default placeOrder;
