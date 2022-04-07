import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

const FoodCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const [availability, setAvailability] = useState("");
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (file) => {
    setImage(file[0]);
  };

  const saveFoodData = async (e) => {
    e.preventDefault();
    setLoading(true);
    const fd = new FormData();
    fd.append("name", foodData.name);
    fd.append("price", foodData.price);
    fd.append("status", availability);
    fd.append("image", image);
    await axios
      .post("http://localhost:8000/api/foods", fd, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/foods");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setLoading(false);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Add Food</div>
              <div className="card-tools">
                <Link to="/dashboard/foods" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveFoodData} method="post">
                <div className="form-group">
                  <label htmlFor="name">Food Name</label>
                  <input
                    onChange={handleInputChange}
                    value={foodData.name}
                    name="name"
                    type="text"
                    className={`form-control ${
                      validationErr.name ? "is-invalid" : ""
                    }`}
                    id="name"
                  />
                  {validationErr.name ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.name}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="price">Price</label>
                    <input
                      onChange={handleInputChange}
                      value={foodData.price}
                      name="price"
                      type="text"
                      className={`form-control ${
                        validationErr.price ? "is-invalid" : ""
                      }`}
                      id="price"
                    />
                    {validationErr.price ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.price}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-group">
                    <label htmlFor="status">Availability</label>
                    <select
                      onChange={(e) => setAvailability(e.target.value)}
                      value={foodData.status}
                      name="status"
                      type="text"
                      className={`form-control ${
                        validationErr.status ? "is-invalid" : ""
                      }`}
                      id="status"
                    >
                      <option selected disabled>
                        Select Availability
                      </option>
                      <option
                        value="Available"
                        selected={foodData.status === "Available"}
                      >
                        Available
                      </option>
                      <option
                        value="Not Available"
                        selected={foodData.status === "Not Available"}
                      >
                        Not Available
                      </option>
                    </select>
                    {validationErr.status ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.status}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="image">Photo</label>
                  <input
                    onChange={(e) => handleImageChange(e.target.files)}
                    name="image"
                    type="file"
                    className={`form-control ${
                      validationErr.image ? "is-invalid" : ""
                    }`}
                    id="image"
                  />
                  {validationErr.image ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.image}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group my-2">
                  <button
                    onClick={saveFoodData}
                    type="submit"
                    className="btn bg-indigo"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm mr-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCreate;
