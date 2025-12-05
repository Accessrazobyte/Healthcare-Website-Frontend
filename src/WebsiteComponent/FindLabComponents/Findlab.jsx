import React from "react";
import Navbar from "../Homecomponents/Navbar";
import TopBar from "../Homecomponents/TopBar";
import Footer from "../Homecomponents/Footer";

const labsData = [
  {
    name: "Max Lab",
    type: "Company Owned Centre",
    area: "Rajender Nagar",
    address: "Old Rajender Nagar, Shop No 49/3 Central Delhi, 110060",
  },
  {
    name: "HealthPlus Lab",
    type: "Franchise",
    area: "Ludhiana",
    address: "Main Street, Ludhiana, Punjab, 141001",
  },
  {
    name: "Apollo Diagnostics",
    type: "Company Owned Centre",
    area: "Delhi",
    address: "Connaught Place, New Delhi, 110001",
  },
  {
    name: "Medlife Lab",
    type: "Franchise",
    area: "Rajender Nagar",
    address: "Sector 12, Rajender Nagar, Delhi",
  },
  {
    name: "Pathology Care",
    type: "Company Owned Centre",
    area: "Delhi",
    address: "Shahdara, Delhi, 110032",
  },
];

const Findlab = () => {
  return (
    <>
      <TopBar />
      <Navbar />
      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500">
          Home <span className="mx-2">{">"}</span>
          <span className="text-blue-600 font-medium">Find a Lab</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-blue-900">FIND A LAB</h2>

        {/* Filters Section */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4">
          <select className="border rounded-md px-3 py-2 w-full md:w-48">
            <option>STATE</option>
            <option>Delhi</option>
            <option>Punjab</option>
          </select>
          <select className="border rounded-md px-3 py-2 w-full md:w-48">
            <option>CITY</option>
            <option>Delhi</option>
            <option>Ludhiana</option>
          </select>
          <select className="border rounded-md px-3 py-2 w-full md:w-48">
            <option>AREA</option>
            <option>Rajender Nagar</option>
          </select>
          <button className="ml-auto flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900">
            <span className="material-icons">my_location</span> NEAR ME
          </button>
        </div>

        {/* Map Section */}
        <div className="w-full h-96 rounded-md overflow-hidden border">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.83919881663!2d77.06889935!3d28.527582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b3bb1233fb%3A0x8f8c09caa9a9cbfd!2sDelhi!5e0!3m2!1sen!2sin!4v1639643676475!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            title="Google Map"
          ></iframe>
        </div>

        {/* Labs Count */}
        <p className="text-sm text-gray-600">{labsData.length} Max Labs found</p>

        {/* Lab Cards */}
        <div className="space-y-4">
          {labsData.map((lab, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 border"
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div>
                  <h3 className="text-lg font-bold text-blue-900">{lab.name}</h3>
                  <p className="text-blue-600 font-medium">
                    {lab.area} ({lab.type})
                  </p>
                  <p className="text-gray-700 mt-1">{lab.address}</p>
                </div>
                <div className="flex gap-3">
                  <button className="text-blue-600 font-semibold hover:underline">
                    See Details
                  </button>
                  <button className="bg-blue-900 text-white px-4 py-2 rounded-md">
                    Walk In
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default Findlab;
