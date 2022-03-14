import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

const HallCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [hallData, sethallData] = useState({
    amenities:[],
  });
  const [loading, setLoading] = useState(false);
  const [halls, setHalls] = useState();
  const [floors, setFloors] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const handleInputChange = (e) => {
    sethallData({ ...hallData, [e.target.name]: e.target.value });
    console.log(hallData);
  };

  const getFloors = async () => {
    await axios.get("http://localhost:8000/api/floors").then((res) => {
      setFloors(res.data);
    });
  };
  const getAmenities = async () => {
    await axios.get("http://localhost:8000/api/amenities").then((res) => {
      setAmenities(res.data);
    });
  };
  const handleRoleChange = (e, act) => {
    console.log(e);
    setSelectedAmenities(e);
  };
  const amenitiesOptions = [];
  amenities.map((amenity) => {
    amenitiesOptions.push({ label: amenity.name, value: amenity.id });
  });
  

  useEffect(() => {
    getFloors();
    getAmenities();
    
  }, []);

  const saveHall = async (e) => {
    e.preventDefault();
    let values = selectedAmenities.map((val) => val.value);

    setLoading(true);
    const fd = new FormData();
    fd.append("name", hallData.name);
    fd.append("description", hallData.description);
    fd.append("base_occupancy", hallData.base_occupancy);
    fd.append("high_occupancy", hallData.high_occupancy);
    fd.append("amenities", hallData.selectedAmenities);
    fd.append("floor_id", hallData.floor_id);
    fd.append("image", hallData.image);
    fd.append("base_price", hallData.base_price);
    fd.append("high_price", hallData.high_price);

    await axios
      .post("http://localhost:8000/api/halls", fd)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/admin/halls");
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
              <div className="card-title text-lg">Add Hall</div>
              <div className="card-tools">
                <Link to="/admin/halls" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
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
                  <label htmlFor="base_occupancy">Base Occupancy</label>
                  <input
                    onChange={handleInputChange}
                    value={hallData.base_ocupancy}
                    name="base_occupancy"
                    type="text"
                    className={`form-control ${
                      validationErr.base_occupancy ? "is-invalid" : ""
                    }`}
                    id="base_occupancy"
                    placeholder="Enter Base Occupancy"
                  />
                  {validationErr.base_occupancy ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.base_occupancy}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="high_occupancy">High Occupancy</label>
                  <input
                    onChange={handleInputChange}
                    value={hallData.high_ocupancy}
                    name="high_occupancy"
                    type="text"
                    className={`form-control ${
                      validationErr.high_occupancy ? "is-invalid" : ""
                    }`}
                    id="base_occupancy"
                    placeholder="Enter High Occupancy"
                  />
                  {validationErr.high_occupancy ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.high_occupancy}
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
                <div className="form-group">
                  <label htmlFor="amenities">Amenity</label>
                  <Select
                    isMulti
                    onChange={handleRoleChange}
                    value={selectedAmenities}
                    options={amenitiesOptions}
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
                </div>
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
                  <label htmlFor="base_price">Base Price</label>
                  <input
                    onChange={handleInputChange}
                    value={hallData.base_price}
                    name="base_price"
                    type="text"
                    className={`form-control ${
                      validationErr.base_price ? "is-invalid" : ""
                    }`}
                    id="base_price"
                    placeholder="Enter Base Price"
                  />
                  {validationErr.base_price ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.base_price}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="high_price">High Price</label>
                  <input
                    onChange={handleInputChange}
                    value={hallData.high_price}
                    name="high_price"
                    type="text"
                    className={`form-control ${
                      validationErr.high_price ? "is-invalid" : ""
                    }`}
                    id="high_price"
                    placeholder="Enter High Price"
                  />
                  {validationErr.high_price ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.high_price}
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

export default HallCreate;
