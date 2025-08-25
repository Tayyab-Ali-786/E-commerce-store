import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import { BiAtom } from "react-icons/bi";

export default function Navbar() {

  const url = "https://store-cartify.netlify.app/";
  const qrUrl = `https://quickchart.io/qr?text=${url}&size=500`;

  const showQrToast = () => {
    toast.custom(
      <div className="bg-white p-6 rounded-xl shadow-md flex flex-col items-center border border-teal-100 transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <p className="text-base font-semibold text-gray-800 mb-3">
          Scan to visit on mobile
        </p>
        <img
          src={qrUrl}
          alt="QR Code"
          className="w-36 h-36 rounded-lg border border-teal-200"
        />
      </div>,
      {
        duration: 5000,
        position: "top-center",
      }
    );
  };

  const helpandsupporttoast = () => {
    toast.custom(
      <div className="bg-white p-6 rounded-xl shadow-md border border-teal-100">
        <h4 className="font-semibold text-lg text-gray-800 mb-3">
          Help & Support
        </h4>
        <ul className="text-gray-700 text-sm space-y-2">
          <li className="hover:text-teal-500 transition-colors duration-200 cursor-pointer">
            Help Center
          </li>
          <li className="hover:text-teal-500 transition-colors duration-200 cursor-pointer">
            Customer Care
          </li>
          <li className="hover:text-teal-500 transition-colors duration-200 cursor-pointer">
            Track Your Order
          </li>
          <li className="hover:text-teal-500 transition-colors duration-200 cursor-pointer">
            Leave a Review
          </li>
        </ul>
      </div>,
      {
        duration: 3000,
        position: "top-center",
      }
    );
  };

  return (
    <div className="bg-gradient-to-r from-violet-600 to-violet-800 shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <ul className="flex justify-end text-sm font-medium text-white gap-8 items-center">
          <li>
            <button
              onClick={showQrToast}
              className="transition-transform duration-200 hover:scale-105 hover:text-teal-300"
            >
              Visit on Mobile
            </button>
          </li>
          <li>
            <NavLink
              to="Seller"
              className="transition-transform duration-200 hover:scale-105 hover:text-teal-300"
            >
              Sell on Cartify
            </NavLink>
          </li>
          <li>
            <NavLink
              to="cart"
              className="transition-transform duration-200 hover:scale-105 hover:text-teal-300"
            >
              Visit Cart
            </NavLink>
          </li>
          <li>
            <button
              onClick={helpandsupporttoast}
              className="transition-transform duration-200 hover:scale-105 hover:text-teal-300"
            >
              Help & Support
            </button>
          </li>
        </ul>
      </nav>
      <header className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center text-4xl text-white mb-4 md:mb-0">
          <BiAtom className="text-teal-300" />
          <NavLink to={"/"} className="ml-2 font-semibold">
            Cartify
          </NavLink>
        </div>
        <div className="w-full md:w-1/2">
          <input
            className="w-full p-3 text-gray-800 bg-white border border-teal-200 rounded-md focus:border-teal-500 focus:outline-none transition-colors duration-300"
            type="text"
            placeholder="Search for products, brands & more"
          />
        </div>
      </header>
    </div>
  );
}
