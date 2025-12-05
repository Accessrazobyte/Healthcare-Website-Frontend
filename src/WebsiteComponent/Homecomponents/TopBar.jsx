import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaPhoneAlt, FaSearch } from "react-icons/fa";

const TopBar = () => {
  const phoneNumber = "7982100200";
  const placeholderText = "Search for tests, packages";

  const [inputValue, setInputValue] = useState("");
  const [showLength, setShowLength] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (inputValue) return; // Stop animation while typing

    const speed = isDeleting ? 20 : 30; // faster smooth animation
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setShowLength((prev) => {
          if (prev < placeholderText.length) return prev + 1;
          setTimeout(() => setIsDeleting(true), 800); // pause at full text
          return prev;
        });
      } else {
        setShowLength((prev) => {
          if (prev > 0) return prev - 1;
          setIsDeleting(false);
          return prev;
        });
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [showLength, isDeleting, inputValue]);

  return (
    <div className="w-full bg-[#26C6DA] py-1 px-4 flex items-center justify-between shadow-sm">
      <div className="flex-1"></div>

      <div className="flex-1 flex justify-center">
        <div className="relative flex items-center w-full max-w-xl bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
          {/* Smooth animated placeholder */}
          <span
            className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none pointer-events-none overflow-hidden whitespace-nowrap transition-all duration-200`}
            style={{ width: `${(showLength / placeholderText.length) * 100}%` }}
          >
            {placeholderText}
          </span>

          {/* Input field */}
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="relative w-full px-3 py-1 text-sm outline-none rounded-l-md bg-transparent z-10"
            placeholder=""
            spellCheck={false}
          />

          {/* Search Button */}
          <button className="px-3 py-1 bg-[#E5E5E5] text-[#A5AEAF] rounded-r-md z-0 flex items-center justify-center">
            <FaSearch className="text-xl" />
          </button>
        </div>
      </div>

      <div className="flex-1 flex justify-end items-center gap-4 text-lg">
        <a
          href={`https://wa.me/${phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group flex items-center gap-2 px-4 bg-white rounded-md overflow-hidden"
        >
          <FaWhatsapp className="text-green-600 text-xl z-10" />
          <span className="z-10 text-green-700">Support</span>
          <span className="absolute inset-0 border-2 border-green-600 rounded-md w-0 h-full opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-500 shadow-md"></span>
        </a>

        <a
          href={`tel:${phoneNumber}`}
          className="relative group flex items-center gap-2 px-4 bg-white rounded-md overflow-hidden"
        >
          <FaPhoneAlt className="text-blue-700 text-xl z-10" />
          <span className="z-10 text-blue-700">Call Now</span>
          <span className="absolute inset-0 border-2 border-blue-700 rounded-md w-0 h-full opacity-0 group-hover:w-full group-hover:opacity-100 transition-all duration-500 shadow-md"></span>
        </a>
      </div>
    </div>
  );
};

export default TopBar;
