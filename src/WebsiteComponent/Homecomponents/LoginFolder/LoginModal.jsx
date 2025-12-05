import React from "react";

const LoginModal = ({ open, onClose }) => {
  return (
    <>
      {/* NOTE: Background black removed as per request */}

      {/* RIGHT SIDE SLIDE PANEL */}
      <div
        className={`fixed top-0 right-0 h-full bg-white w-[330px] md:w-[380px] shadow-2xl z-50 transform transition-transform duration-700 rounded-l-2xl
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-6 relative">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-0 left-3 text-gray-600 text-2xl hover:text-black cursor-pointer"
          >
            ×
          </button>

          <h2 className="text-2xl font-semibold text-gray-800">Login/Sign Up</h2>
          <p className="text-gray-500 mt-2">
            Please Enter Your Phone Number to Proceed
          </p>

          {/* Phone Input */}
          <div className="flex items-center border border-teal-500 rounded-lg mt-6 overflow-hidden">
            <span className="px-3 py-2 bg-white text-gray-700 border-r border-teal-500">
              +91
            </span>
            <input
              type="tel"
              placeholder="Enter Phone Number"
              className="w-full px-3 py-2 focus:outline-none"
            />
          </div>

          {/* Login Button */}
          <button className="w-full mt-6 bg-teal-500 text-white py-3 rounded-lg hover:bg-teal-600 transition shadow cursor-pointer">
            Login
          </button>

          {/* Image */}
          <div className="mt-8 flex justify-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2974/2974062.png"
              alt="Delivery"
              className="w-40"
            />
          </div>

          <h3 className="text-lg font-semibold text-gray-800 mt-4 text-center">
            Free Home Sample Pick-up
          </h3>
          <p className="text-gray-500 text-sm px-4 mt-1 text-center">
            Care at your Convenience. Get tested from the comfort of your home.
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginModal;
