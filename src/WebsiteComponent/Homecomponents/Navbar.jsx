import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LocationDialog from "../AllDailogFroms/LocationDialog";
import LoginModal from "../../WebsiteComponent/Homecomponents/LoginFolder/LoginModal";   // << ADD THIS
import { useCart } from "../../Components/MainRoute/CartContext";

const Navbar = () => {
  const [locationDialogOpen, setLocationDialogOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);  // << ADD THIS

  const { cartItems } = useCart();

  return (
    <>
      <div className="hidden md:flex w-full bg-white shadow-sm px-6 py-1 items-center justify-between sticky top-0 z-50">

        <div className="flex items-center gap-6">
          <Link to={"/"}>
            <img
              src={"/images/Wello logo.png"}
              alt="Wello Logo"
              className="h-20 cursor-pointer"
            />
          </Link>

          <div
            onClick={() => setLocationDialogOpen(true)}
            className="flex items-center gap-1 cursor-pointer text-base font-semibold"
          >
            <FaMapMarkerAlt className="text-[#80deea] text-xl" />
            <div className="flex flex-col items-start">
              <p className="text-sm opacity-50 leading-none">My Location</p>
              <span className="text-[12px]">Delhi ▼</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-6 font-semibold text-gray-800 text-base justify-center md:justify-start">
          <Link to={"/lab-tests"}>Find A Test</Link>
          <Link to={"/full-body-health-checkup"}>Full Body Health Checkup</Link>
          <Link to={"/download-report"}>Schedule Scan</Link>
          <span>Other Links</span>
        </div>

        <div className="flex items-center gap-6 text-blue-900">
          
          {/* User Login Button */}
          <button
            className="text-teal-600 hover:text-blue-700 cursor-pointer"
            onClick={() => setLoginOpen(true)}  // << OPEN MODAL
          >
            <FaUser size={20} />
          </button>

          {/* Cart */}
          <Link to={"/cart_section"} className="relative cursor-pointer">
            <FaShoppingCart size={22} className="text-teal-600 hover:text-blue-700" />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Location Modal */}
      {locationDialogOpen && (
        <LocationDialog onClose={() => setLocationDialogOpen(false)} />
      )}

      {/* 🔥 LOGIN MODAL HERE */}
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
};

export default Navbar;
