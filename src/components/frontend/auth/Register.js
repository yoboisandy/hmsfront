import axios from "../../../helpers/instance";
import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FullLoadingContext from "../../../contexts/FullLoadingContext";
import UserContext from "../../../contexts/UserContext";

const Register = () => {
  const [user] = useContext(UserContext);
  const [fullLoading, setFullLoading] = useContext(FullLoadingContext);
  let navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerData, setCustomerData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    address: "",
    phone: "",
    citizenship_number: "",
  });
  const [validationErr, setValidationErr] = useState({});
  const handleInputChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const saveCustomer = async (e) => {
    e.preventDefault();
    await axios
      .post(`http://localhost:8000/api/register`, {
        firstname: customerData.firstname,
        lastname: customerData.lastname,
        email: customerData.email,
        password: customerData.password,
        address: customerData.address,
        phone: customerData.phone,
        citizenship_number: customerData.citizenship_number,
      })
      .then((res) => {
        Swal.fire({
          title: "Success",
          text: "You're Registered Successfully",
        });
        navigate("/login");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
  };

  useEffect(() => {
    setFullLoading(true);
    if (localStorage.getItem("token")) {
      axios
        .get("http://localhost:8000/api/user", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        .then((res) => {
          if (res.data.role === "Admin") {
            navigate("/dashboard");
          } else if (res.data.role === "Customer") {
            navigate("/");
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
    setFullLoading(false);
  }, []);

  return (
    <div>
      <div className="flex py-8 items-center justify-center  bg-gray-100">
        <div className="px-8 py-6 mx-4  text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3">
          <h3 className="text-2xl font-bold text-center">Register</h3>
          <form onSubmit={saveCustomer}>
            <div className="mt-4">
              <div>
                <label className="block" htmlFor="firstname">
                  First Name
                  <label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.firstname}
                      type="text"
                      name="firstname"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
                {validationErr.firstname && (
                  <div className="text-red-400 text-sm">
                    {validationErr.firstname}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="Name">
                  Last Name
                  <label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.lastname}
                      type="text"
                      name="lastname"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
                {validationErr.lastname && (
                  <div className="text-red-400 text-sm">
                    {validationErr.lastname}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                  <label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.email}
                      type="text"
                      name="email"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
                {validationErr.email && (
                  <div className="text-red-400 text-sm">
                    {validationErr.email}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Phone
                  <label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.phone}
                      type="text"
                      name="phone"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
                {validationErr.phone && (
                  <div className="text-red-400 text-sm">
                    {validationErr.phone}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Address
                  <label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.address}
                      type="text"
                      name="address"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
                {validationErr.address && (
                  <div className="text-red-400 text-sm">
                    {validationErr.address}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Citizenship Number
                  <label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.citizenship_number}
                      type="text"
                      name="citizenship_number"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
                {validationErr.citizenship_number && (
                  <div className="text-red-400 text-sm">
                    {validationErr.citizenship_number}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <label className="block">
                  Password
                  <label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.password}
                      type="password"
                      name="password"
                      className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                  </label>
                </label>
                {validationErr.password && (
                  <div className="text-red-400 text-sm">
                    {validationErr.password}
                  </div>
                )}
              </div>

              <div className="flex">
                <button
                  type="submit"
                  className="w-full px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-900"
                >
                  Create Account
                </button>
              </div>
              <div className="mt-6 text-grey-dark">
                Already have an account?
                <Link
                  className="text-blue-600 hover:underline ml-1"
                  to="/login"
                >
                  Login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
