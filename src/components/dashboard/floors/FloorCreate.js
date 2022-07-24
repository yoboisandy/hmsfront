import React from "react";

import axios from "../../../helpers/instance";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const FloorCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const [floorData, setFloorData] = useState({});
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setFloorData({ ...floorData, [e.target.name]: e.target.value });
  };
  const saveFloor = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await axios
      .post(`http://localhost:8000/api/floors`, floorData)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/floors");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Add Customer</div>
              <div className="card-tools">
                <Link to="/dashboard/customers" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveFloor} method="post">
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    onChange={handleInputChange}
                    value={floorData.name}
                    name="name"
                    type="text"
                    className={`form-control ${
                      validationErr.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Enter  Name"
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
                  <label htmlFor="floor_number">Floor Number</label>
                  <input
                    onChange={handleInputChange}
                    value={floorData.floor_number}
                    name="floor_number"
                    type="text"
                    className={`form-control ${
                      validationErr.floor_number ? "is-invalid" : ""
                    }`}
                    id="floor_number"
                    placeholder="Enter Floor Number"
                  />
                  {validationErr.floor_number ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.floor_number}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Floor Description</label>
                  <textarea
                    onChange={handleInputChange}
                    value={floorData.description}
                    name="description"
                    type="text"
                    className={`form-control ${
                      validationErr.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    placeholder="Enter Details About The Floor"
                  ></textarea>
                  {validationErr.description ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.description}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group my-2">
                  <button
                    onClick={saveFloor}
                    type="submit"
                    className="btn bg-indigo"
                  >
                    {btnLoading ? (
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

export default FloorCreate;
