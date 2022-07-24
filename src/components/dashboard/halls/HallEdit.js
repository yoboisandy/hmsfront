import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../helpers/instance";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const HallCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [hallData, sethallData] = useState({
    name: "",
    description: "",
    occupancy: "",
    high_occupancy: "",
    child_occupancy: "",
    adult_occupancy: "",
    image: null,
    floor_id: "",
    price: "",
    high_price: "",
    amenities: [],
  });
  let { id } = useParams();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [floors, setFloors] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    sethallData({ ...hallData, [e.target.name]: e.target.value });
    console.log(hallData);
  };

  const getFloors = async () => {
    await axios.get("http://localhost:8000/api/floors").then((res) => {
      setFloors(res.data);
    });
  };
  const handleImageChange = (file) => {
    setImage(file[0]);
  };

  const getAmenities = async () => {
    setLoading(true);
    await axios.get("http://localhost:8000/api/amenities").then((res) => {
      setAmenities(res.data);
    });
    setLoading(false);
  };

  const handleAmenityChange = (e) => {
    console.log(e);
    setSelectedAmenities(e);
  };
  const amenitiesOptions = [];
  amenities.map((amenity) => {
    amenitiesOptions.push({ label: amenity.name, value: amenity.id });
  });
  let selectedAmenitiesOption = [];
  selectedAmenities.map((amenity) => {
    selectedAmenitiesOption.push({ value: amenity.id, label: amenity.name });
  });

  const saveHall = async (e) => {
    setBtnLoading(true);
    e.preventDefault();
    let values = selectedAmenities.map((val) => val.value);

    const fd = new FormData();
    fd.append("name", hallData.name);
    fd.append("description", hallData.description);
    fd.append("occupancy", hallData.occupancy);
    fd.append("high_occupancy", hallData.high_occupancy);
    fd.append("floor_id", hallData.floor_id);
    fd.append("image", image);
    fd.append("price", hallData.price);
    fd.append("high_price", hallData.high_price);
    fd.append("_method", "PUT");
    // values.forEach((item) => {
    //   fd.append("amenities[]", item);
    // });
    await axios
      .post(`http://localhost:8000/api/halls/${id}`, fd)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/halls");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };

  const getHallData = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/halls/${id}`).then((res) => {
      setSelectedAmenities(res.data.amenities);
      sethallData(res.data);
      // console.log(hallData);
      // console.log(res.data.amenities);
    });
    setLoading(false);
  };

  useEffect(() => {
    getHallData();
    getAmenities();
    getFloors();
    console.log(selectedAmenitiesOption);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Edit Hall</div>
              <div className="card-tools">
                <Link to="/dashboard/halls" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              {loading && (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-indigo" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {!loading && (
                <form onSubmit={saveHall} method="post">
                  <div className="form-group">
                    <label htmlFor="Name">Name</label>
                    <input
                      onChange={handleInputChange}
                      value={hallData.name}
                      name="name"
                      type="text"
                      className={`form-control ${
                        validationErr.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      placeholder="Enter Hall Name"
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
                    <label htmlFor="description">Description</label>
                    <input
                      onChange={handleInputChange}
                      value={hallData.description}
                      name="description"
                      type="text"
                      className={`form-control ${
                        validationErr.description ? "is-invalid" : ""
                      }`}
                      id="description"
                      placeholder="Enter Hall Description"
                    />
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
                  <div className="form-group">
                    <label htmlFor="image">Image</label>
                    <input
                      onChange={(e) => handleImageChange(e.target.files)}
                      name="image"
                      type="file"
                      className={`form-control p-0 ${
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
                  <div className="form-group">
                    <label htmlFor="occupancy">Occupancy</label>
                    <input
                      onChange={handleInputChange}
                      value={hallData.occupancy}
                      name="occupancy"
                      type="text"
                      className={`form-control ${
                        validationErr.occupancy ? "is-invalid" : ""
                      }`}
                      id="occupancy"
                      placeholder="Enter  Occupancy"
                    />
                    {validationErr.occupancy ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.occupancy}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  {/* <div className="form-group">
                  <label htmlFor="amenity_id">Amenity</label>
                  <select
                    className={`form-control ${
                      validationErr.amenity_id ? "is-invalid" : ""
                    }`}
                    onChange={handleInputChange}
                    value={hallData.amenity_id}
                    name="amenity_id"
                    id="amenity_id"
                  >
                    <option selected value="">
                      Select Amenity
                    </option>
                    {amenities.map((amenity) => {
                      return (
                        <option
                          selected={hallData.amenity_id == amenity.id}
                          value={amenity.id}
                        >
                          {amenity.name}
                        </option>
                      );
                    })}
                  </select>
                  {validationErr.amenity_id ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.amenity_id}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div> */}
                  {/* <div className="form-group">
                  <label htmlFor="amenities">Amenity</label>
                  <AsyncSelect
                    isMulti
                    onChange={handleAmenityChange}
                    defaultOptions={selectedAmenitiesOption}
                    loadOptions={amenitiesOptions}
                    name="amenities"
                    className={`${validationErr.amenities ? "is-invalid" : ""}`}
                    id="amenities"
                  />
                  {validationErr.amenities ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.amenities}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div> */}
                  <div className="form-group">
                    <label htmlFor="floor_id">Floor</label>
                    <select
                      className={`form-control ${
                        validationErr.floor_id ? "is-invalid" : ""
                      }`}
                      onChange={handleInputChange}
                      value={hallData.floor_id}
                      name="floor_id"
                      id="floor_id"
                    >
                      <option selected value="">
                        Select Floor
                      </option>
                      {floors.map((floor) => {
                        return (
                          <option
                            selected={hallData.floor_id == floor.id}
                            value={floor.id}
                          >
                            {floor.name}
                          </option>
                        );
                      })}
                    </select>
                    {validationErr.floor_id ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.floor_id}
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
                      value={hallData.price}
                      name="price"
                      type="text"
                      className={`form-control ${
                        validationErr.price ? "is-invalid" : ""
                      }`}
                      id="price"
                      placeholder="Enter Base Price"
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

                  <div className="form-group my-2">
                    <button
                      onClick={saveHall}
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

export default HallCreate;
