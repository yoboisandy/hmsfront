import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

const AmenitiesCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [icon, setIcon] = useState(null);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {}, []);

  const handleImage = (files) => {
    setIcon(files[0]);
  };

  const saveAmenity = async (e) => {
    e.preventDefault();
    setLoading(true);

    let fd = new FormData();
    fd.append("name", name);
    fd.append("icon", icon);

    await axios
      .post("http://localhost:8000/api/amenities", fd, {
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
        navigate("/dashboard/amenities");
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
              <div className="card-title text-lg">Add Amenity</div>
              <div className="card-tools">
                <Link to="/dashboard/amenities" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveAmenity} method="post">
                <div className="form-group">
                  <label htmlFor="name">Amenity Name</label>
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    name="name"
                    type="text"
                    className={`form-control ${
                      validationErr.name ? "is-invalid" : ""
                    }`}
                    id="name"
                    placeholder="Enter Amenity Name"
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
                  <label htmlFor="icon">Icon</label>
                  <input
                    onChange={(e) => handleImage(e.target.files)}
                    name="icon"
                    type="file"
                    className={`form-control p-0 ${
                      validationErr.icon ? "is-invalid" : ""
                    }`}
                    id="icon"
                  />
                  {validationErr.icon ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.icon}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group my-2">
                  <button
                    onClick={saveAmenity}
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

export default AmenitiesCreate;
