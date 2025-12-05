import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import Footer from "../../Homecomponents/Footer";
import TopBar from "../../Homecomponents/TopBar";
import Navbar from "../../Homecomponents/Navbar";

const ReportsPage = () => {
  const [orderId, setOrderId] = useState("");
  const [member, setMember] = useState("All");
  const [date, setDate] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // toggle login

  return (
    <>
    <TopBar/>
    <Navbar/>
    <div className="p-6 bg-gray-50 ">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-4">
        <span className="text-blue-500 cursor-pointer hover:underline">Home</span>
        <span className="mx-1">{">"}</span>
        <span className="text-gray-800 font-medium">Reports</span>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Order ID Search */}
        <div>
          <h3 className="font-semibold text-teal-600 mb-2">ALL ORDERS</h3>
          <div className="relative">
            <FaSearch className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Order ID"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full border rounded-md pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>

        {/* Member Name Dropdown */}
        <div>
          <h3 className="font-semibold text-teal-600 mb-2">Member Name</h3>
          <select
            value={member}
            onChange={(e) => setMember(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option>All</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
        </div>

        {/* Booking Date Dropdown */}
        <div>
          <h3 className="font-semibold text-teal-600 mb-2">Booking Date</h3>
          <select
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="">Select Date</option>
            <option value="2025-09-01">01 Sep 2025</option>
            <option value="2025-09-05">05 Sep 2025</option>
          </select>
        </div>
      </div>

      {/* Content Section */}
      {!isLoggedIn ? (
        <div className="border rounded-md bg-gray-50 p-6 text-center text-blue-900">
          Please login to view reports
        </div>
      ) : (
        <div className="border rounded-md bg-white shadow p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Your Reports
          </h3>
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="border p-2">Order ID</th>
                <th className="border p-2">Member Name</th>
                <th className="border p-2">Booking Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2">#12345</td>
                <td className="border p-2">John Doe</td>
                <td className="border p-2">01 Sep 2025</td>
                <td className="border p-2 text-green-600">Completed</td>
              </tr>
              <tr>
                <td className="border p-2">#12346</td>
                <td className="border p-2">Jane Smith</td>
                <td className="border p-2">05 Sep 2025</td>
                <td className="border p-2 text-yellow-600">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
    <Footer/>
    </>
  );
};

export default ReportsPage;
