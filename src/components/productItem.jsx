import React, { useContext } from "react";
import { ShopContext } from "../context/shopContext";
import { Link } from "react-router-dom";


const ProductItem = ({id, image, name, price ,discount}) => {
  const { currency } = useContext(ShopContext);
  const percent = Math.ceil(((discount-price)/(discount/100)));
;

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="  overflow-hidden">
        {/* <p className="mb-[-10px] ">10%</p>
        <img
          className="hover:scale-110 transition ease-in-out"
          src={image[0]}
          alt=""
        /> */}
        <div className="relative w-fit">
  <p className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-sm z-10">
  -{percent}%
  </p>
  <img
    className="hover:scale-110 transition ease-in-out"
    src={image[0]}
    alt=""
  />
    <p className="text-center pt-3 pb-1 text-sm">{name}</p>
</div>
       
        <div className="flex justify-center gap-2">
        
        <p className=" line-through">{currency}
        {discount}</p>
        <p className=" font-bold text-l ">
          {currency}
          {price}
          
          
        </p>
        
        
        
        
        </div>
       
      </div>
      
    </Link>
  );
};

export default ProductItem;
