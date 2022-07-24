import axios from "../../../helpers/instance";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FullLoadingContext from "../../../contexts/FullLoadingContext";
const OTPVerification = () => {
  const [fullLoading, setFullLoading] = useContext(FullLoadingContext);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const navigate = useNavigate();
  const submitOTP = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/api/token`, {
        token,
        user_id: sessionStorage.getItem("forgotpassword_userid"),
      })
      .then((res) => {
        if (res.data.message) {
          navigate("/changepassword");
        } else {
          setError("Invalid Token");
        }
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  const canView = () => {
    setFullLoading(true);
    if (!sessionStorage.getItem("forgotpassword_userid")) {
      navigate("/login");
    }
    setFullLoading(false);
  };

  useEffect(() => {
    canView();
  }, []);

  return (
    <div>
      <div className="flex py-8 items-center justify-center  bg-gray-100">
        <div className="px-8 py-6 mx-4  text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
          <h3 className="text-2xl font-bold text-center">Forget Passsword</h3>
          <form onSubmit={submitOTP}>
            {error && (
              <div className="text-white font-medium bg-red-600 py-3 px-2 rounded mt-4 text-center">
                {error}
              </div>
            )}
            <div className="mt-4 text-center text-sm">
              <p>Check your inbox and enter the sent code below</p>
            </div>
            <div className="mt-4">
              <label className="block font-bold" htmlFor="email">
                Code
              </label>
              <div>
                <input
                  type="text"
                  onChange={(e) => setToken(e.target.value)}
                  id="token"
                  name="token"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-fit px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-900"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;
