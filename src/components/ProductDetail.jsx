import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function fetchProduct() {
        console.log("loading");
      let res = await fetch(`https://dummyjson.com/products/${id}`);
      let data = await res.json();
      setProduct(data);
    }
    fetchProduct();
  }, [id]);

  if (!product)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      {/* Product Section */}
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10 bg-white shadow rounded-lg mt-6">
        {/* Left - Product Image */}
        <div className="flex justify-center items-center bg-gray-50 rounded-lg p-6">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full max-h-[500px] object-contain"
          />
        </div>

        {/* Right - Product Details */}
        <div className="flex flex-col space-y-4">
          <h1 className="text-4xl font-bold">{product.title}</h1>

          <p className="text-gray-600 text-lg leading-relaxed">
            {product.description}
          </p>

          {/* Price Section */}
          <div className="text-3xl font-bold text-orange-600">
            ${product.price}
            <span className="text-base text-gray-400 ml-2">
              ({product.discountPercentage}% OFF)
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500 text-xl">⭐</span>
            <span className="font-medium">{product.rating}</span>
          </div>

          {/* Stock info */}
          <p className="text-sm text-gray-500">
            {product.stock > 0
              ? `${product.stock} items left in stock`
              : "Out of Stock"}
          </p>

          {/* Buttons */}
          <div className="flex space-x-4 pt-6">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg shadow font-medium text-lg">
              Add to Cart
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg shadow font-medium text-lg">
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Specs Section */}
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg mt-6 p-6">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Specifications
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
          <li>Brand: {product.brand || "Generic"}</li>
          <li>Category: {product.category}</li>
          <li>Stock: {product.stock}</li>
          <li>Discount: {product.discountPercentage}%</li>
          <li>Rating: {product.rating}</li>
          <li>Warranty: 1 Year Brand Warranty</li>
        </ul>
      </div>

      {/* Reviews Section */}
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg mt-6 p-6">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          Customer Reviews
        </h2>
        {product.reviews && product.reviews.length > 0 ? (
          <div className="space-y-4">
            {product.reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-yellow-500">⭐</span>
                  <span className="font-medium text-gray-800">
                    {review.rating}
                  </span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
                <p className="text-gray-400 text-xs mt-2">
                  By {review.reviewerName}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No reviews available.</p>
        )}
      </div>

      {/* Related Products Section */}
      <div className="max-w-7xl mx-auto bg-white shadow rounded-lg mt-6 p-6 mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* Placeholder cards */}
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
    </div>
  );
}
