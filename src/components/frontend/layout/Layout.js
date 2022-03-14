import React from "react";
import { NavLink } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div>
      <header className="text-gray-600 body-font shadow-md">
        <div className="container mx-auto flex flex-wrap p-4 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <img src="logo1.png" alt="" className="w-44" />
            {/* <span className="ml-3 text-xl">Tailblocks</span> */}
          </a>
          <nav className="md:ml-auto flex flex-wrap items-center text-base justify-center gap-4">
            <NavLink
              to="/"
              className="mr-5 hover:text-gray-900 font-semibold pb-0.5 border-b-2 border-transparent transition-all duration-300 hover:border-indigo-600"
            >
              Home
            </NavLink>
            <NavLink
              to="/rooms"
              className="mr-5 hover:text-gray-900 font-semibold pb-0.5 border-b-2 border-transparent transition-all duration-300 hover:border-indigo-600"
            >
              Rooms
            </NavLink>
            <NavLink
              to="/halls"
              className="mr-5 hover:text-gray-900 font-semibold pb-0.5 border-b-2 border-transparent transition-all duration-300 hover:border-indigo-600"
            >
              Halls
            </NavLink>
            <NavLink
              to="/about"
              className="mr-5 hover:text-gray-900 font-semibold pb-0.5 border-b-2 border-transparent transition-all duration-300 hover:border-indigo-600"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="mr-5 hover:text-gray-900 font-semibold pb-0.5 border-b-2 border-transparent transition-all duration-300 hover:border-indigo-600"
            >
              Contact Us
            </NavLink>
          </nav>
          <button className="inline-flex items-center bg-indigo-500 border-0 py-1 px-3 focus:outline-none hover:bg-indigo-700 rounded text-white text-base ml-3 mt-4 md:mt-0">
            Book Now
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-4 h-4 ml-1"
              viewBox="0 0 24 24"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </header>
      <div>{children}</div>
      <footer className="text-gray-600 body-font bg-gray-800">
        <div className="container px-5 py-16 mx-auto flex md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="w-64 flex-shrink-0 md:mx-0 mx-auto text-center md:text-left">
            <a className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
              <img src="logo2.png" alt="" className="w-56" />
              {/* <span className="ml-3 text-xl">Tailblocks</span> */}
            </a>
            <p className="mt-2 text-sm text-gray-500">
              Air plant banjo lyft occupy retro adaptogen indego
            </p>
          </div>
          <div className="flex-grow flex flex-wrap md:pl-20 -mb-10 md:mt-0 mt-10 md:text-left text-center">
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    First Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Second Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Third Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    First Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Second Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Third Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
            {/* <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    First Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Second Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Third Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div> */}
            <div className="lg:w-1/3 md:w-1/2 w-full px-4">
              <h2 className="title-font font-medium text-white tracking-widest text-sm mb-3">
                CATEGORIES
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    First Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Second Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Third Link
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-gray-400">
                    Fourth Link
                  </a>
                </li>
              </nav>
            </div>
          </div>
        </div>
        <div className="bg-gray-100">
          <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
            <p className="text-gray-500 text-sm text-center sm:text-left">
              © 2022 Rise-n-Shine — risenshine.com
            </p>
            <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
              <a className="text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                </svg>
              </a>
              <a className="ml-3 text-gray-500">
                <svg
                  fill="currentColor"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={0}
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="none"
                    d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                  />
                  <circle cx={4} cy={4} r={2} stroke="none" />
                </svg>
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
