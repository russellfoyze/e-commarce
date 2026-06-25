import React, { useContext, useState } from "react";
import axios from "axios";
import Title from "../components/title";
import CartTotal from "../components/cartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/shopContext";

const placeOrder = () => {
  const { navigate, cartItems, products, getCartAmount, backendURL } = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const buildOrderItems = () => {
    const items = [];
    for (const productId in cartItems) {
      const itemSizes = cartItems[productId];
      const product = products.find((p) => p._id === productId);
      if (!product) continue;

      for (const size in itemSizes) {
        const quantity = itemSizes[size];
        if (quantity > 0) {
          const subtotal = product.price * quantity;
          items.push({
            productId,
            name: product.name,
            size,
            quantity,
            price: product.price,
            subtotal,
            image: product.image?.[0] || "",
          });
        }
      }
    }
    return items;
  };

  const handleSubmit = async () => {
    setError("");
    const items = buildOrderItems();
    if (!customerName || !phone || !address) {
      setError("Please fill in all delivery details.");
      return;
    }
    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendURL + "/api/order/create", {
        customerName,
        phone,
        address,
        paymentMethod: method,
        items,
        totalAmount: getCartAmount(),
      });
      if (response.data.success) {
        localStorage.setItem('lastOrder', JSON.stringify(response.data.order));
        navigate('/orders');
      } else {
        setError(response.data.message || "Failed to place order.");
      }
    } catch (err) {
      setError(err.message || "Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14  border-t">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"Delivery"} text2={"Information"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
            placeholder="Your Name"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <textarea
          className="border border-gray-300 rounded py-2 px-3.5 w-full"
          rows="4"
          placeholder="Full Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"Payment"} text2={"Method"} />
          <div className="flex gap-3 flex-row lg:flex-row">
            <div onClick={() => setMethod('bkash')} className={`flex items-center gap-3 border p-2 cursor-pointer ${method === 'bkash' ? 'border-black' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'bkash' ? 'bg-green-500' : ''}`}></p>
              <img className="h-5 mx-4" src={assets.bkash} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className={`flex items-center gap-3 border p-2 cursor-pointer ${method === 'cod' ? 'border-black' : ''}`}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'cod' ? 'bg-green-500' : ''}`}></p>
              <p className="text-gray-500 text-sm font-medium mx-4">
                Cash on delivery
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button
              onClick={handleSubmit}
              className="bg-black text-white px-16 py-3 text-sm"
              disabled={loading}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default placeOrder;
