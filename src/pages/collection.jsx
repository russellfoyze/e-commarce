import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { ShopContext } from "../context/shopContext";
import { assets } from "../assets/assets";
import Title from "../components/title";
import ProductItem from "../components/productItem";

const collection = () => {
  const { products , search , showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(true);
  const [fileterProduct, setFilterProduct] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType , setSortType]= useState('relavent')

  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter =()=>{
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category))
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory) )
    }
    setFilterProduct(productsCopy);
  }

  const sortProduct = ()=>{
    let fpCopy = fileterProduct.slice();

    switch(sortType){
      case 'low-high':
        setFilterProduct(fpCopy.sort((a,b)=> (a.price - b.price)))
        break;
      
      case 'high-low':
        setFilterProduct(fpCopy.sort((a,b)=>(b.price - a.price)))
        break;

        default:
          applyFilter();
          break;
    }

  }


  useEffect(()=>{
    applyFilter();
  },[category, subCategory, search , showSearch])

  useEffect(()=>{
    sortProduct();
  },[sortType])
  
 

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 ">
      {/* Filter option */}
      <div className="min-w-60">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex item-center cursor-pointer gap-2"
        >
          Filters{" "}
          <img
            src={assets.dropdown_icon}
            className={`h-3 mt-2 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            alt=""
          />
        </p>
        {/* Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORYS</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Men"}
                onChange={toggleCategory}
              />
              Men
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Women"}
                onChange={toggleCategory}
              />
              Women
            </p>
            <p className="flex gap-2">
              <input
                className="w-3 "
                type="checkbox"
                value={"Kids"}
                onChange={toggleCategory}
              />
              Kids
            </p>
          </div>
        </div>
        {/* Sub Category Filter */}
        <div
          className={`border border-gray-300 pl-5 py-5 mt-6 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-3 text-sm font-medium">Type</p>
          <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
            <p className="flex gap-2">
              <input className="w-3 " type="checkbox" value={"Topwear"} onChange={toggleSubCategory} />
              T-shirt
            </p>
            <p className="flex gap-2">
              <input className="w-3 " type="checkbox" value={"Bottomwear"} onChange={toggleSubCategory} />
              Pant
            </p>
            <p className="flex gap-2">
              <input className="w-3 " type="checkbox" value={"Winterwear"} onChange={toggleSubCategory} />
              Hoddie
            </p>
          </div>
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={"All"} text2={"Collection"} />
          {/* Product Sort */}
          <select onChange={(e)=>setSortType(e.target.value)} className="border-2 border-gray-300 text-sm px-2">
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: low to high</option>
            <option value="high-low">Sort by: high to low</option>
          </select>
        </div>
        {/* map products */}
        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-6">
          {fileterProduct.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default collection;
