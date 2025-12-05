import React from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestSection = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Full Body Health Checks",
      tests: [
        {
          name: "Basic Health Checkup",
          desc: "Includes 20 tests",
          price: 999,
          oldPrice: 1998,
          discount: "50% off",
          type: "BOOK",
        },
        {
          name: "Comprehensive Health Checkup",
          desc: "Includes 50 tests",
          price: 2499,
          oldPrice: 4998,
          discount: "50% off",
          type: "BOOK",
        },
        {
          name: "Executive Health Checkup",
          desc: "Includes 80 tests + Consultation",
          price: 3999,
          oldPrice: 4999,
          discount: "20% off",
          type: "BOOK",
        },
        {
          name: "Master Health Checkup",
          desc: "Includes 100+ tests",
          price: 6999,
          oldPrice: 13998,
          discount: "50% off",
          type: "BOOK",
        },
      ],
    },
    {
      title: "Fever: Dengue, Chikungunya, Malaria",
      tests: [
        {
          name: "Dengue NS 1 Antigen Test",
          desc: "Includes 6 tests",
          price: 600,
          oldPrice: 1200,
          discount: "50% off",
          type: "ADD",
        },
        {
          name: "Typhi Dot Test (IgM & IgG)",
          desc: "Includes 6 tests",
          price: 900,
          oldPrice: 1800,
          discount: "50% off",
          type: "ADD",
        },
        {
          name: "Max Fever Panel Advance",
          desc: "Includes 8 tests",
          price: 1400,
          oldPrice: 2800,
          discount: "50% off",
          type: "BOOK",
        },
        {
          name: "Max Fever Panel (Basic)",
          desc: "Includes 6 tests",
          price: 700,
          oldPrice: 1400,
          discount: "50% off",
          type: "BOOK",
        },
      ],
    },
    {
      title: "HIV Tests",
      tests: [
        {
          name: "HIV 1 & 2 Antibody Test",
          desc: "Includes 6 tests",
          price: 500,
          oldPrice: 1000,
          discount: "50% off",
          type: "BOOK",
        },
        {
          name: "HIV RNA PCR Test",
          desc: "Early detection test",
          price: 2000,
          oldPrice: 4000,
          discount: "50% off",
          type: "BOOK",
        },
        {
          name: "CD4 Count Test",
          desc: "For monitoring HIV patients",
          price: 1200,
          oldPrice: 2400,
          discount: "50% off",
          type: "BOOK",
        },
        {
          name: "Western Blot HIV Test",
          desc: "Confirmatory test",
          price: 1500,
          oldPrice: 3000,
          discount: "50% off",
          type: "BOOK",
        },
      ],
    },
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, 
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640, 
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="w-full px-4 sm:px-6 py-6 bg-[#E6F6FE]">
      <div className="max-w-5xl mx-auto">
        {categories.map((category, i) => (
          <div key={i} className="mb-12">

            {/* Header */}
            <div className="flex justify-between items-center mb-6 px-1 sm:px-2">
              <h2 className="text-lg sm:text-2xl font-semibold text-gray-900">
                {category.title}
              </h2>

              {/* View All Button → Navigate */}
              <button
                onClick={() => navigate("/iteampage")}
                className="bg-[#25A0D9] text-white px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-semibold hover:bg-blue-700 transition"
              >
                View All
              </button>
            </div>

            {/* SLIDER */}
            <Slider {...settings} className="px-1 sm:px-2">
              {category.tests.map((test, index) => (
                <div key={index} className="p-2">
                  <div
                    className="bg-white rounded-md shadow-md p-3 sm:p-5 hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full"
                    style={{ minHeight: "210px" }}
                  >
                    <h3 className="text-[#25A0D9] font-bold text-sm sm:text-md mb-1">
                      {test.name}
                    </h3>

                    {test.desc && (
                      <p className="text-gray-600 text-xs sm:text-sm mb-3">
                        • {test.desc}
                      </p>
                    )}

                    <div className="flex-grow"></div>

                    <div className="flex items-center gap-2 mb-2">
                      {test.oldPrice && (
                        <span className="text-gray-400 line-through text-xs sm:text-sm">
                          ₹ {test.oldPrice.toLocaleString()}
                        </span>
                      )}
                      <span className="text-[#25A0D9] font-bold text-base sm:text-lg">
                        ₹ {test.price.toLocaleString()}
                      </span>
                    </div>

                    {test.discount && (
                      <div className="mb-3 sm:mb-4 -ml-3 sm:-ml-5">
                        <span className="bg-blue-100 text-[#189ED3] text-[10px] sm:text-xs font-semibold px-2 py-1 inline-block">
                          {test.discount}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                       <Link to={"/iteampage"}>
                      <button className="bg-gradient-to-r from-[#26C6DA] to-[#3DDFF3] hover:opacity-90 text-white cursor-pointer text-xs sm:text-sm px-3 sm:px-5 py-1 rounded-md shadow-md font-semibold transition">
                        Book Now
                      </button>
                      </Link>
                     <Link to={"/iteampage"}>
                      <a
                        href="#"
                        className="text-blue-600 text-xs sm:text-sm hover:underline font-medium cursor-pointer"
                      >
                        Know More
                      </a>
                     </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        ))}

        {/* Custom Slider Arrow CSS */}
        <style>{`
          .slick-prev:before,
          .slick-next:before {
            color: #42B035 !important;
            font-size: 20px;
          }
          @media (min-width: 640px) {
            .slick-prev:before,
            .slick-next:before {
              font-size: 24px;
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default TestSection;
