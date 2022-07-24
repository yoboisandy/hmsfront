import axios from "../../../helpers/instance";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOTP = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/api/forgotpassword`, {
        email,
      })
      .then((res) => {
        sessionStorage.setItem("forgotpassword_email", res.data.email);
        sessionStorage.setItem("forgotpassword_userid", res.data.user_id);
        console.log(sessionStorage.getItem("forgotpassword"));
        navigate("/otpverification");
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      <div className="flex py-8 items-center justify-center  bg-gray-100">
        <div className="px-8 py-6 mx-4  text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
          <h3 className="text-2xl font-bold text-center">Forget Passsword</h3>
          <form onSubmit={sendOTP}>
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Enter your registered email so that we can verify you</p>
            </div>
            {error && (
              <div className="text-white font-medium bg-red-600 py-3 px-2 rounded mt-4 text-center">
                {error}
              </div>
            )}
            <div className="mt-4">
              <label className="block" htmlFor="email">
                Email
              </label>
              <div>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  type="text"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-fit px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-900"
              >
                Send OTP to Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
