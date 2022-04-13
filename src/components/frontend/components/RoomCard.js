import React from "react";
import { Link } from "react-router-dom";

const RoomCard = ({
  id,
  image,
  type_name,
  base_price,
  base_occupancy,
  higher_occupancy,
  index,
}) => {
  return (
    <div className="p-4 md:w-1/3 ">
      <div className="border-t-4 border-indigo-500 rounded-lg">
        <div className="h-full border-l-2 border-r-2 border-b-2 border-gray-200 border-opacity-60  overflow-hidden">
          <img
            className="lg:h-64  md:h-36 w-full object-cover"
            src={`http://localhost:8000/storage/${image}`}
            alt="blog"
          />
          <div className="p-6">
            {/* <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
            CATEGORY
          </h2> */}
            <h1 className="title-font text-lg font-semibold text-gray-900 mb-3">
              {type_name}
            </h1>
            <p className="leading-relaxed mb-3">
              Starting from Rs.{base_price}/Per Night{" "}
            </p>
            <div className="flex items-center justify-between ">
              <Link
                to={`/rooms/${id}`}
                className="text-indigo-500 inline-flex items-center md:mb-2 lg:mb-0"
              >
                More Details
                <svg
                  className="w-4 h-4 ml-2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <div className="text-gray-400 inline-flex items-center leading-none text-sm">
                <button
                  data-tooltip-target="tooltip-default"
                  data-tooltip-trigger="hover"
                >
                  <i className="fas fa-users mr-1" />
                  {base_occupancy} to {higher_occupancy}
                </button>
                <div
                  id="tooltip-default"
                  role="tooltip"
                  className="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 transition-opacity duration-300 tooltip dark:bg-gray-700"
                >
                  Tooltip content
                  <div className="tooltip-arrow" data-popper-arrow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
