import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../helpers/instance";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const FloorEdit = () => {
  const [floorData, setfloorData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setfloorData({ ...floorData, [e.target.name]: e.target.value });
    console.log(floorData);
  };

  const getFloor = async () => {
    setLoading(true);
    await axiosInstance
      .get(`http://localhost:8000/api/floors/${id}`)
      .then((res) => {
        setfloorData(res.data);
      });
    setLoading(false);
  };

  let { id } = useParams();

  const updateFloor = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await axiosInstance
      .put(`http://localhost:8000/api/floors/${id}`, floorData)
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

  useEffect(() => {
    getFloor();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Update Floor</div>
              <div className="card-tools">
                <Link to="/dashboard/floors" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              {loading ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-indigo" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={updateFloor} method="post">
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
                      placeholder="Enter Floor Name"
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
                    <label htmlFor="name">Floor Number</label>
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
                    <label htmlFor="name">Floor Description</label>
                    <textarea
                      onChange={handleInputChange}
                      value={floorData.description}
                      name="description"
                      type="text"
                      className={`form-control ${
                        validationErr.description ? "is-invalid" : ""
                      }`}
                      id="description"
                      placeholder="Enter Floor Description"
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
                      onClick={updateFloor}
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
                          <span>Updating...</span>
                        </>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorEdit;
