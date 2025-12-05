import React, { useState } from "react";
import { useCart } from "../../Components/MainRoute/CartContext";
import TopBar from "./TopBar";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";

const CartPage = () => {
  const { cartItems, decreaseQty, increaseQty, removeItem } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  return (
    <>
      <TopBar />
      <Navbar />

      <div className="w-full bg-[#F8FCFF] py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ---------------- LEFT SECTION ---------------- */}
          <div className="lg:col-span-2">

            <h2 className="text-2xl font-bold text-gray-800 mb-1">
              TESTS IN YOUR CART ({cartItems.length})
            </h2>

            <hr className="border-[#3ac2d3] mb-6" />

            {cartItems.length === 0 ? (
              <div className="bg-white shadow p-10 rounded-lg text-center">
                <h3 className="text-lg font-semibold">Your cart is empty</h3>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow p-6 border mb-5"
                >
                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold text-[#0087b0]">
                      {item.name}
                    </h3>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-blue-500 text-2xl cursor-pointer"
                    >
                      <AiFillDelete />
                    </button>
                  </div>

                  {/* Price */}
                  <p className="text-[#0087b0] text-xl font-bold mt-2">
                    ₹ {item.price}
                  </p>

                  {/* Report Time */}
                  <p className="text-gray-700 mt-4">
                    <span className="font-semibold">🕒 Report Generation time -</span>{" "}
                    Within 24hrs * Hrs after sample collection
                  </p>

                  {/* Description */}
                  <p className="text-gray-700 mt-3 leading-6">
                    <span className="font-semibold"> Description - </span>
                    Influenza or flu is a contagious respiratory disease caused due to
                    exposure to the viruses within the influenza family. It can lead to
                    mild or severe illness as the viruses are transmitted mostly through
                    coughing or sneezing.
                  </p>

                  {/* Quantity Box */}
                  {/* <div className="flex items-center gap-4 mt-6">
                    <button
                      onClick={() => decreaseQty(item.id)}
                      className="bg-gray-200 w-9 h-9 rounded flex justify-center items-center text-xl"
                    >
                      -
                    </button>

                    <span className="text-xl font-semibold">{item.qty}</span>

                    <button
                      onClick={() => increaseQty(item.id)}
                      className="bg-gray-200 w-9 h-9 rounded flex justify-center items-center text-xl"
                    >
                      +
                    </button>
                  </div> */}
                </div>
              ))
            )}
          </div>

          {/* ---------------- RIGHT SECTION ---------------- */}
          <div className="space-y-6">

            {/* COUPON BOX */}
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold">ENTER COUPON CODE</h3>

              <div className="flex items-center mt-3">
                <input
                  type="text"
                  placeholder="ENTER COUPON CODE"
                  className="flex-1 border p-2 rounded-l-md"
                />
                <button className="bg-[#25C0DC] text-white px-4 py-2 rounded-r-md">
                  Apply
                </button>
              </div>

              <p className="text-sm text-gray-600 mt-2">
                Coupon Code: <span className="font-bold">SS10</span>
              </p>
              <p className="text-xs text-gray-500">
                Flat 10% OFF for Senior Citizens Only — Please Login to Apply
              </p>
            </div>

            {/* SUMMARY BOX */}
            <div className="bg-white shadow p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Booking Summary</h3>

              <hr />

              <div className="flex justify-between mt-4 text-gray-700 text-lg">
                <span>Subtotal</span>
                <span>₹ {subtotal}</span>
              </div>

              <div className="flex justify-between mt-2 text-gray-700 text-lg">
                <span>Home Collection Charges</span>
                <span className="text-green-600 font-semibold">Free</span>
              </div>

              <div className="flex justify-between mt-3 text-gray-700 text-lg">
                <span>Discount</span>
                <span>₹ 0</span>
              </div>

              <hr className="my-4" />

              <div className="flex justify-between text-xl font-bold text-[#25C0DC]">
                <span>To Pay</span>
                <span>₹ {subtotal}</span>
              </div>

              <button className="w-full bg-[#25C0DC] hover:bg-[#1a96a8] text-white py-3 rounded-md mt-6 text-lg font-semibold shadow">
                LOGIN TO CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CartPage;
