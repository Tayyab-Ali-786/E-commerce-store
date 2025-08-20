import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { CiStar } from "react-icons/ci";

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
      <div className="bg-white flex">
        <div className="bg-gray-200 w-md flex justify-center m-10">
          <img src={product.thumbnail} alt="random image" />
        </div>
        <div className="p-9">
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p>{product.description}</p>
            <div className="flex gap-4">
              <div className="text-2xl font-extrabold text-red-500">
                {product.price}$
              </div>
              <p className="font-bold text-gray-400 text-sm pt-1.5">
                {" "}
                ({product.discountPercentage})%OFF
              </p>
            </div>
            <div className="flex">
              <CiStar size={26} />
              <div className="pt-0.5">{product.rating}</div>
            </div>
            <div>
              <div className="flex justify-evenly gap-4">
                <button className="bg-orange-500 text-white font-medium px-8 py-3 rounded-lg shadow-sm hover:bg-orange-600 hover:shadow-md hover:scale-105 transition-all duration-200 w-40">
                  Add to Cart
                </button>
                <button className="bg-orange-600 text-white font-medium px-8 py-3 rounded-lg shadow-sm hover:bg-orange-700 hover:shadow-md hover:scale-105 transition-all duration-200 w-40">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white m-8">
        <div className="text-2xl font-bold">
          <h1>Specifications:</h1>
        </div>
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
