import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { CiNoWaitingSign, CiStar } from "react-icons/ci";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

// New component for the "Buy Now" form, keeping the logic separate and clean
const BuyNowForm = ({ onClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Log the form data for demonstration
    console.log("Form data submitted:", data);
    toast("Order submitted successfully!");
    onClose(); // Close the modal after submission
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Checkout Information</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-2xl font-semibold"
          >
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 font-semibold mb-1"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              {...register("fullName", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.fullName && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 font-semibold mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email", { required: true })}
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div>
            <label
              htmlFor="address"
              className="block text-gray-700 font-semibold mb-1"
            >
              Shipping Address
            </label>
            <textarea
              id="address"
              {...register("address", { required: true })}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.address && (
              <span className="text-red-500 text-sm">
                This field is required
              </span>
            )}
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-200"
            >
              Submit Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false); // New state to show/hide the form

  function AddToCart() {
    let existing = JSON.parse(localStorage.getItem("userdata")) || [];

    const newProduct = {
      picture: product.thumbnail,
      name: product.title,
      price: product.price,
    };

    existing.push(newProduct);

    localStorage.setItem("userdata", JSON.stringify(existing));

    toast(
      "Your item has been added to the cart. Please visit the cart to confirm your order."
    );
  }

  // The Buy_Now function now simply sets the state to show the form
  function Buy_Now() {
    setShowForm(true);
  }

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        console.log("loading");
        let res = await fetch(`https://dummyjson.com/products/${id}`);
        let data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading || !product) {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="bg-white flex flex-col md:flex-row m-8 p-4 md:p-8 rounded-lg shadow-md">
        <div className="md:w-1/2 flex justify-center p-4">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="max-w-full h-auto rounded-lg shadow-lg"
          />
        </div>
        <div className="p-4 md:p-9 md:w-1/2">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">
              {product.title}
            </h1>
            <p className="text-gray-600">{product.description}</p>
            <div className="flex gap-4 items-center">
              <div className="text-3xl font-extrabold text-red-600">
                ${product.price}
              </div>
              <p className="font-bold text-gray-500 text-sm pt-1">
                ({product.discountPercentage})% OFF
              </p>
            </div>
            <div className="flex items-center">
              <CiStar size={26} className="text-yellow-500" />
              <div className="pl-1 text-gray-700">{product.rating}</div>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="bg-orange-500 text-white font-medium px-8 py-3 rounded-lg shadow-sm hover:bg-orange-600 hover:shadow-md transition-all duration-200 w-full sm:w-40"
                  onClick={AddToCart}
                >
                  Add to Cart
                </button>
                <button
                  className="bg-orange-600 text-white font-medium px-8 py-3 rounded-lg shadow-sm hover:bg-orange-700 hover:shadow-md transition-all duration-200 w-full sm:w-40"
                  onClick={Buy_Now}
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white m-8 p-8 shadow-sm rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Specifications
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse bg-white shadow-sm rounded-lg">
            <thead>
              <tr className="bg-gray-100 text-gray-800 text-sm font-semibold">
                <th className="px-6 py-4 text-left border-b border-gray-200">
                  Brand
                </th>
                <th className="px-6 py-4 text-left border-b border-gray-200">
                  Stock
                </th>
                <th className="px-6 py-4 text-left border-b border-gray-200">
                  Rating
                </th>
                <th className="px-6 py-4 text-left border-b border-gray-200">
                  Category
                </th>
                <th className="px-6 py-4 text-left border-b border-gray-200">
                  Discount
                </th>
                <th className="px-6 py-4 text-left border-b border-gray-200">
                  Warranty
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {product.brand}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {product.stock}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {product.rating}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {product.category}
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {product.discountPercentage}%
                </td>
                <td className="px-6 py-4 border-b border-gray-200 text-gray-700">
                  {product.warrantyInformation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="bg-white m-8 p-8 shadow-sm rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Customer Reviews
        </h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-yellow-500 text-lg">⭐</span>
                  <span className="font-semibold text-gray-800">
                    {review.rating}
                  </span>
                </div>
                <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                <p className="text-gray-500 text-xs">
                  By {review.reviewerName}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No reviews available.</p>
        )}
      </div>
      <div className="bg-white m-8 p-8 shadow-sm rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gray-100 p-4 rounded-lg shadow hover:shadow-lg transition"
            >
              <div className="h-32 bg-gray-300 rounded mb-2"></div>
              <p className="font-medium text-gray-700">Product {i}</p>
              <p className="text-sm text-gray-500">$99.00</p>
            </div>
          ))}
        </div>
      </div>
      {/* Conditionally render the form modal */}
      {showForm && <BuyNowForm onClose={() => setShowForm(false)} />}
    </div>
  );
}


