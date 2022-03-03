import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const ShiftEdit = () => {
  const [shiftData, setShiftData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setShiftData({ ...shiftData, [e.target.name]: e.target.value });
    console.log(shiftData);
  };

  let { id } = useParams();

  const updateShift = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await axios
      .put(`http://localhost:8000/api/shifts/${id}`, shiftData)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/admin/shifts");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };

  const fetchShift = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/shifts/${id}`).then((res) => {
      setShiftData({
        name: res.data.name,
      });
    });
    setLoading(false);
    console.log(shiftData);
  };

  useEffect(() => {
    fetchShift();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Update Shift</div>
              <div className="card-tools">
                <Link to="/admin/shifts" className="btn-sm bg-indigo">
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
                <form onSubmit={updateShift} method="post">
                  
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
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
                      onClick={updateShift}
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

export default ShiftEdit;
