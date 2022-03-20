import React from "react";

const Login = () => {
  return (
    <div>
      <div className="flex py-8 items-center justify-center  bg-gray-100">
        <div className="px-8 py-6 mx-4  text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
          <h3 className="text-2xl font-bold text-center">Login</h3>
          <form action>
            <div className="mt-4">
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                  <label>
                    <input
                      type="text"
                      placeholder="Email"
                      id="email"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="password">
                  Password
                  <label>
                    <input
                      type="password"
                      id="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
              </div>
              {/* <span className="text-xs text-red-400">
                Password must be same!
              </span> */}
              <div className="flex">
                <button className="w-full px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-900">
                  Login
                </button>
              </div>
              <div className="mt-6 text-grey-dark">
                Don't have an account?
                <a className="text-blue-600 hover:underline ml-1" href="#">
                  Register
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
