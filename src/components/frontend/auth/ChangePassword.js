import axios from "../../../helpers/instance";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FullLoadingContext from "../../../contexts/FullLoadingContext";

const ChangePassword = () => {
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [fullLoading, setFullLoading] = useContext(FullLoadingContext);

  const navigate = useNavigate();
  const changePassword = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `http://localhost:8000/api/updatepassword/${sessionStorage.getItem(
          "forgotpassword_userid"
        )}`,
        {
          password,
          password_confirmation: passwordConfirmation,
        }
      )
      .then((res) => {
        Swal.fire({
          title: "Success!",
          text: res.data.message,
          icon: "success",
        });
        deleteToken();
        sessionStorage.clear();
        navigate("/login");
      })
      .catch((err) => setError(err.response.data.message));
  };

  const deleteToken = async () => {
    await axios.post(
      `http://localhost:8000/api/deletetoken/${sessionStorage.getItem(
        "forgotpassword_userid"
      )}`
    );
    //   .then((res) => {
    //     Swal.fire({
    //       title: "Success!",
    //       text: res.data.message,
    //       icon: "success",
    //     });
    //   });
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
          <h3 className="text-2xl font-bold text-center">Change Passsword</h3>
          <form onSubmit={changePassword}>
            {error && (
              <div className="text-white font-medium bg-red-600 py-3 px-2 rounded mt-4 text-center">
                {error}
              </div>
            )}
            <div className="mt-4">
              <label className="block" htmlFor="newpassword">
                New Password
              </label>
              <div>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block" htmlFor="newpassword">
                Confirm New Password
              </label>
              <div>
                <input
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-fit px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-900"
              >
                Change Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
