import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

const LocationDialog = ({ onClose }) => {
  const [city, setCity] = useState("Delhi");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Location:", city);
    onClose(); // close after save
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-bold text-gray-800">Select Location</h2>
          <button onClick={onClose}>
            <FaTimes className="text-gray-500 hover:text-red-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="text-sm font-medium text-gray-700">
            Enter your city
          </label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Type your city"
          />

          <button
            type="submit"
            className="bg-[#26C6DA] hover:bg-[#1bb5c8] text-white py-2 rounded-md font-semibold"
          >
            Save Location
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationDialog;
