import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import TopBar from "../../Homecomponents/TopBar";
import Navbar from "../../Homecomponents/Navbar";
import Footer from "../../Homecomponents/Footer";
import Carousel from "../../SliderPage/Carousel";

const categories = [
  "Allergy Test",
  "Anemia Test",
  "Auto immune",
  "Blood disorder",
  "Bone and Joint",
  "Cancer Test",
  "Cardiology Test",
];

const mustHaveTests = [
  "Blood Urea",
  "CRP",
  "Creatinine Serum",
  "Fasting Blood Sugar",
  "HbA1c",
];

const packages = [
  {
    name: "Wellwise Total Profile",
    tests: 80,
    oldPrice: 4499,
    newPrice: 2849,
    discount: "40% Off",
  },
  {
    name: "Wellwise Advanced Profile",
    tests: 75,
    oldPrice: 3599,
    newPrice: 2159,
    discount: "40% Off",
  },
  {
    name: "WellWise Exclusive Profile - Male",
    tests: 87,
    oldPrice: 5599,
    newPrice: 3539,
    discount: "40% Off",
  },
  {
    name: "WellWise Exclusive Profile - Female",
    tests: 87,
    oldPrice: 5599,
    newPrice: 3539,
    discount: "40% Off",
  },
  {
    name: "WellWise Platinum - Male",
    tests: 97,
    oldPrice: 7999,
    newPrice: 4799,
    discount: "40% Off",
  },
  {
    name: "WellWise Platinum - Female",
    tests: 97,
    oldPrice: 7999,
    newPrice: 4799,
    discount: "40% Off",
  },
  {
    name: "WellWise Premium - Male",
    tests: 111,
    oldPrice: 12999,
    newPrice: 7799,
    discount: "40% Off",
  },
  {
    name: "WellWise Premium - Female",
    tests: 111,
    oldPrice: 12999,
    newPrice: 7799,
    discount: "40% Off",
  },
  {
    name: "WellWise Basic Profile",
    tests: 60,
    oldPrice: 2399,
    newPrice: 1619,
    discount: "40% Off",
  },
];

const FullbodyHealthPackages = () => {
  const [search, setSearch] = useState("");

  return (
    <>
    <TopBar/>
    <Navbar/>
    <Carousel/>
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen p-4 gap-4">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-1/4 bg-white shadow rounded-lg p-4 space-y-6">
        {/* Categories */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Categories</h2>
          <div className="space-y-2">
            {categories.map((cat, idx) => (
              <label key={idx} className="flex items-center space-x-2 text-sm">
                <input type="checkbox" className="accent-blue-600" />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Must Have Tests */}
        <div>
          <h2 className="font-semibold text-lg mb-2">Must Have Test</h2>
          <input
            type="text"
            placeholder="Search Test"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-2 py-1 mb-3 text-sm"
          />
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {mustHaveTests
              .filter((t) =>
                t.toLowerCase().includes(search.toLowerCase())
              )
              .map((test, idx) => (
                <label key={idx} className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="accent-blue-600" />
                  <span>{test}</span>
                </label>
              ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-bold">
            Full Body Health Checkup Price (Showing {packages.length} Packages)
          </h1>
          <button className="flex items-center border rounded px-3 py-1 text-sm">
            <FaFilter className="mr-2" /> Sort By
          </button>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {packages.map((pkg, idx) => (
            <div
              key={idx}
              className="bg-white border rounded-lg shadow p-4 flex flex-col"
            >
              {/* Compare + Discount */}
              <div className="flex justify-between items-center mb-2">
                <label className="flex items-center space-x-2 text-sm">
                  <input type="checkbox" className="accent-blue-600" />
                  <span>Compare</span>
                </label>
                <span className="text-green-600 font-semibold text-sm">
                  {pkg.discount}
                </span>
              </div>

              {/* Package Info */}
              <h2 className="text-blue-700 font-semibold">{pkg.name}</h2>
              <p className="text-sm text-gray-600 mb-2">
                Includes {pkg.tests} tests
              </p>

              {/* Price */}
              <div className="mb-3">
                <span className="line-through text-gray-400 text-sm mr-2">
                  ₹{pkg.oldPrice}
                </span>
                <span className="text-lg font-bold text-gray-800">
                  ₹{pkg.newPrice}
                </span>
              </div>

              {/* Actions */}
              <div className="flex justify-between items-center mt-auto">
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Know More
                </button>
                <button className="bg-blue-700 text-white px-4 py-1 rounded hover:bg-blue-800">
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default FullbodyHealthPackages;
