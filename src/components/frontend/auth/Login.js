import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FullLoadingContext from "../../../contexts/FullLoadingContext";
import UserContext from "../../../contexts/UserContext";

const Login = () => {
  const [loginDetails, setLoginDetails] = useState({});
  const [user, fetchUser, setUser] = useContext(UserContext);
  const [fullLoading, setFullLoading] = useContext(FullLoadingContext);
  const [error, setError] = useState("");
  const [loggedUser, setloggedUser] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setLoginDetails({ ...loginDetails, [e.target.name]: e.target.value });
  };

  const login = (e) => {
    e.preventDefault();
    setFullLoading(true);
    setError("");
    axios
      .post("http://localhost:8000/api/login", loginDetails)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        setloggedUser(res.data.user);
        setUser(res.data.user);
        if (res.data.user.role === "Admin") {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.message);
        console.log(err.response.data.message);
      });
    setFullLoading(false);
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
          <h3 className="text-2xl font-bold text-center">Login</h3>
          <form onSubmit={login}>
            {error && (
              <div className="text-white font-medium bg-red-600 py-3 px-2 rounded mt-4 text-center">
                {error}
              </div>
            )}
            <div className="mt-4">
              <div className="mt-4">
                <label className="block" htmlFor="email">
                  Email
                  <label>
                    <input
                      onChange={handleInputChange}
                      type="text"
                      placeholder="Email"
                      id="email"
                      name="email"
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
                      onChange={handleInputChange}
                      type="password"
                      id="password"
                      name="password"
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
                <button
                  onClick={login}
                  className="w-full px-6 py-2 mt-4 text-white bg-indigo-600 rounded-lg hover:bg-indigo-900"
                >
                  Login
                </button>
              </div>
              <div className="mt-6">
                forget password?
                <Link
                  to="/forgetpassword"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Click here
                </Link>
              </div>
              <div className="mt-6 text-grey-dark">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline ml-1"
                >
                  Register
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
