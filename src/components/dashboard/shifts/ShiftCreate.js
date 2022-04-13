import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const ShiftCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [shiftData, setshiftData] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setshiftData({ ...shiftData, [e.target.name]: e.target.value });
    console.log(shiftData);
  };

  const saveShift = async (e) => {
    e.preventDefault();

    setLoading(true);
    const fd = new FormData();
    fd.append("name", shiftData.name);

    await axios
      .post("http://localhost:8000/api/shifts", fd, {
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
        navigate("/dashboard/shifts");
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
              <div className="card-title text-lg">Add Shift</div>
              <div className="card-tools">
                <Link to="/dashboard/shifts" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveShift} method="post">
                <div className="form-group">
                  <label htmlFor="name">Shift Name</label>
                  <input
                    onChange={handleInputChange}
                    value={shiftData.name}
                    name="name"
                    type="text"
                    className={`form-control ${
                      validationErr.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Enter Shift Name"
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

                <div className="form-group my-2">
                  <button
                    onClick={saveShift}
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

export default ShiftCreate;
