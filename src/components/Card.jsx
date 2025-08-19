import React from "react";
import { Link } from "react-router-dom";

export default function Card({ product }) {
  return (
    <Link to={`/product/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h2 className="text-lg font-semibold mt-2">{product.title}</h2>
        <p className="text-gray-600">${product.price}</p>
        <button className="mt-2 px-4 py-2 bg-orange-500 text-white rounded">
          View Details
        </button>
      </div>
    </Link>
  );
}
