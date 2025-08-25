import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import { toast } from "react-hot-toast";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const getCartData = () => {
    try {
      const data = localStorage.getItem("userdata");
      if (data) {
        const parsedData = JSON.parse(data);
        if (Array.isArray(parsedData)) {
          setCartItems(parsedData);
        } else {
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Failed to retrieve or parse cart data:", error);
      toast.error("An error occurred while loading your cart.");
      setCartItems([]); 
    }
  };

  const clearCart = () => {
    localStorage.removeItem("userdata");
    setCartItems([]);
    toast.success("Your cart has been cleared!");
  };

  useEffect(() => {
    getCartData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4 md:p-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Your Cart
            </h1>
            {cartItems.length > 0 && (
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-red-500 text-white rounded-lg font-medium hover:bg-red-600 transition-colors duration-200"
              >
                Clear Cart
              </button>
            )}
          </div>
          <hr className="my-6 border-gray-200" />
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <img
                    src={item.picture}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-md mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-800 mb-1">
                    {item.name}
                  </h2>
                  <p className="text-xl font-bold text-gray-900">
                    ${item.price}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-500 font-medium">
                Your cart is empty.
              </p>
              <p className="text-gray-400 mt-2">
                Add some products to your cart to see them here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
