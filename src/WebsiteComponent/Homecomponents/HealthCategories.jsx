import React, { useRef, useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import axios from "axios";

const BASE_URL = "http://localhost:3000"; // your API base URL

const HealthCategories = () => {
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/v1/api/categories`);
      const activeCategories = res.data
        .filter((cat) => cat.status === true)
        .map((cat) => ({
          name: cat.name,
          img: cat.iconimg ? `${BASE_URL}${cat.iconimg}` : "/default-image.png",
        }));
      setCategories(activeCategories);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (categories.length === 0) return <p className="text-center py-8">No active categories found.</p>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Popular health-checkup categories
      </h2>

      <div className="relative">
        {/* Scroll buttons */}
        <div className="absolute inset-y-0 left-0 flex items-center z-10">
          <button
            onClick={() => scroll("left")}
            className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition"
          >
            <FaChevronLeft />
          </button>
        </div>

        <div className="absolute inset-y-0 right-0 flex items-center z-10">
          <button
            onClick={() => scroll("right")}
            className="bg-green-500 text-white p-2 rounded-full shadow-md hover:bg-green-600 transition"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Scrollable categories */}
        <div
          ref={scrollRef}
          className="flex space-x-4 overflow-x-auto scrollbar-hide py-4 px-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {categories.map((cat, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-60 bg-white border border-gray-300 rounded-lg p-2 flex gap-4 items-center hover:shadow-md transition"
            >
              <div className="min-w-12 min-h-12 w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-[#25A0D9] to-[#43C3FF]">
                <img src={cat.img} alt={cat.name} className="w-6 h-6 object-contain" />
              </div>
              <h3 className="text-sm font-medium text-gray-800">{cat.name}</h3>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default HealthCategories;
