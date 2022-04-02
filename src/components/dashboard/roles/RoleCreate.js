import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const RoleCreate = () => {
  const [validationErr, setValidationErr] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const [roleData, setroleData] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setroleData({ ...roleData, [e.target.name]: e.target.value });
    console.log(roleData);
  };

  const saveRole = async (e) => {
    e.preventDefault();

    setLoading(true);
    // const fd = new FormData();
    // fd.append("name", roleData.name);

    await axios
      .post(
        "http://localhost:8000/api/roles",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        roleData
      )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/roles");
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
              <div className="card-title text-lg">Add Role</div>
              <div className="card-tools">
                <Link to="/dashboard/roles" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveRole} method="post">
                <div className="form-group">
                  <label htmlFor="name">Role Name</label>
                  <input
                    onChange={handleInputChange}
                    value={roleData.name}
                    name="name"
                    type="text"
                    className={`form-control ${
                      validationErr.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Enter Role Name"
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
                    onClick={saveRole}
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

export default RoleCreate;
