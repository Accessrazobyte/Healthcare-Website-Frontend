import React, { useState } from "react";
import TopBar from "../../Homecomponents/TopBar";
import Navbar from "../../Homecomponents/Navbar";
import Footer from "../../Homecomponents/Footer";

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
  "KFT Profile",
  "Lipid Profile",
];

const labTests = [
  { name: "Wellwise Premium - Female", tests: 111, price: 7799, oldPrice: 12999, type: "package" },
  { name: "Wellwise Basic Profile", tests: 60, price: 1619, oldPrice: 2399, type: "package" },
  { name: "Dengue NS 1 Antigen Test", price: 600 },
  { name: "Typhidot Test", price: 900 },
  { name: "Vitamin D Test", price: 1600 },
  { name: "SGOT - Aspartate Amino Transferase Test", price: 190 },
  { name: "Platelet Count Test", price: 50 },
  { name: "Blood Culture & Sensitivity Test", price: 1300 },
  { name: "Phlebotomy Service at Home Test", price: 150 },
];

const LabTestsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTest, setSelectedTest] = useState("");

  return (
    <>
    <TopBar/>
    <Navbar/>
    <div className="flex p-6 gap-6">
      {/* Sidebar */}
      <div className="w-72 space-y-6">
        {/* Categories */}
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="font-semibold mb-2">Categories</h3>
          <div className="flex flex-col space-y-1 max-h-60 overflow-y-auto">
            {categories.map((cat, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => setSelectedCategory(cat)}
                />
                <span className="text-gray-700">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Must Have Test */}
        <div className="bg-white shadow rounded-md p-4">
          <h3 className="font-semibold mb-2">Must Have test</h3>
          <input
            type="text"
            placeholder="Search Test"
            className="w-full border rounded-md px-3 py-2 mb-2"
          />
          <div className="flex flex-col space-y-1 max-h-60 overflow-y-auto">
            {mustHaveTests.map((test, idx) => (
              <label key={idx} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedTest === test}
                  onChange={() => setSelectedTest(test)}
                />
                <span className="text-gray-700">{test}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Lab Tests Grid */}
      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {labTests.map((lab, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-md p-4 border flex flex-col justify-between"
          >
            <div>
              <h3 className="text-blue-900 font-semibold text-lg">{lab.name}</h3>
              {lab.tests && <p className="text-gray-600 text-sm">{lab.tests} tests</p>}
              <p className="text-gray-700 mt-1">
                ₹{lab.price}{" "}
                {lab.oldPrice && (
                  <span className="line-through text-gray-400 text-sm">₹{lab.oldPrice}</span>
                )}
              </p>
            </div>
            <div className="mt-3">
              <button className="bg-blue-900 text-white px-4 py-2 rounded-md hover:bg-blue-800 w-full">
                {lab.type === "package" ? "Book" : "Add"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default LabTestsPage;
