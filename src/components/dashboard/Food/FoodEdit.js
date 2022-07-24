import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../helpers/instance";
import Select from "react-select";

const FoodEdit = () => {
  const [validationErr, setValidationErr] = useState({});
  const [availability, setAvailability] = useState("");
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  const [foodData, setFoodData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const token = localStorage.getItem("token");

  let { id } = useParams();

  const handleInputChange = (e) => {
    setFoodData({ ...foodData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (file) => {
    setImage(file[0]);
  };

  const fetchFoodData = async () => {
    setLoading(true);

    await axios.get(`http://localhost:8000/api/foods/${id}`).then((res) => {
      setFoodData(res.data);
    });
    setLoading(false);
  };

  const updateFoodData = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    const fd = new FormData();
    fd.append("name", foodData.name);
    fd.append("price", foodData.price);
    fd.append("image", image);
    fd.append("_method", "PUT");
    // console.log(fd.get("image"));
    await axios
      .post(`http://localhost:8000/api/foods/${id}`, fd)
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
    setBtnLoading(false);
  };

  console.log({ ...foodData, status: availability });
  useEffect(() => {
    fetchFoodData();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Edit Food</div>
              <div className="card-tools">
                <Link to="/dashboard/foods" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            {loading && (
              <div className="d-flex justify-content-center py-5">
                <div className="spinner-border text-indigo" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {!loading && (
              <div className="card-body ">
                <form onSubmit={updateFoodData} method="post">
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
                  <div className="form-group">
                    <label htmlFor="image">Photo</label>
                    <input
                      onChange={(e) => handleImageChange(e.target.files)}
                      name="image"
                      type="file"
                      className={`form-control p-0 ${
                        validationErr.image ? "is-invalid" : ""
                      }`}
                      id="image"
                    />
                    {foodData.image && (
                      <img
                        className="img-fluid mt-2 w-25"
                        src={`http://localhost:8000/storage/${foodData.image}`}
                        alt=""
                      />
                    )}
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
                  {/* <div className="form-group">
                    <div className="form-group">
                      <label htmlFor="status">Availability</label>
                      <select
                        onChange={(e) => {
                          setAvailability(e.target.value);
                        }}
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
                  </div> */}

                  <div className="form-group my-2">
                    <button
                      onClick={updateFoodData}
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
                        "Update"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodEdit;
