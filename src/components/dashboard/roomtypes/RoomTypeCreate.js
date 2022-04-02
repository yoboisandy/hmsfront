import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "axios";

const RoomTypeCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [roomTypeData, setroomTypeData] = useState({
    type_name: "",
    description: "",
    adult_occupancy: "",
    child_occupancy: "",
    base_occupancy: "",
    higher_occupancy: "",
    base_price: "",
    additional_price: "",
    extra_bed_price: "",
  });
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [chk, setChk] = useState(0);
  const token = localStorage.getItem("token");

  const getAmenities = async () => {
    axios
      .get(`http://localhost:8000/api/amenities`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setAmenities(res.data);
      });
  };

  const amenitiesOptions = [];
  amenities.map((amenity) => {
    amenitiesOptions.push({ label: amenity.name, value: amenity.id });
  });

  //   const [roomtypes, setRoomTypes] = useState([]);

  const handleInputChange = (e) => {
    setroomTypeData({ ...roomTypeData, [e.target.name]: e.target.value });
    console.log(roomTypeData);
  };

  const handleAmenityChange = (e) => {
    console.log(e);
    setSelectedAmenities(e);
  };

  useEffect(() => {
    getAmenities();
  }, []);
  const handleImageChange = (file) => {
    setImage(file[0]);
  };
  const handleChkChange = (e) => {
    setChk(e.target.value);
  };
  const saveRoomType = async (e) => {
    e.preventDefault();
    setLoading(true);
    let values = selectedAmenities.map((val) => val.value);
    // console.log(values);
    const fd = new FormData();
    fd.append("type_name", roomTypeData.type_name);
    fd.append("description", roomTypeData.description);
    fd.append("adult_occupancy", roomTypeData.adult_occupancy);
    fd.append("child_occupancy", roomTypeData.child_occupancy);
    fd.append("base_occupancy", roomTypeData.base_occupancy);
    fd.append("higher_occupancy", roomTypeData.higher_occupancy);
    fd.append("base_price", roomTypeData.base_price);
    fd.append("additional_price", roomTypeData.additional_price);
    fd.append("extra_bed_price", roomTypeData.extra_bed_price);
    // fd.append("amenities[]", values);
    values.forEach((item) => {
      fd.append("amenities[]", item);
    });
    fd.append("extra_bed", chk);
    fd.append("image", image);
    console.log(fd.get("amenities"));

    await axios
      .post(
        "http://localhost:8000/api/roomtypes",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        fd
      )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/roomtypes");
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
              <div className="card-title text-lg">Add Room Type</div>
              <div className="card-tools">
                <Link to="/dashboard/roomtypes" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveRoomType} method="post">
                <div className="form-group">
                  <label htmlFor="type_name">Room Type</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.type_name}
                    name="type_name"
                    type="text"
                    className={`form-control ${
                      validationErr.type_name ? "is-invalid" : ""
                    }`}
                    id="type_name"
                    placeholder="Enter Room Number"
                  />
                  {validationErr.type_name ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.type_name}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    onChange={handleInputChange}
                    value={roomTypeData.description}
                    name="description"
                    type="text"
                    className={`form-control ${
                      validationErr.description ? "is-invalid" : ""
                    }`}
                    id="description"
                    placeholder="Description"
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
                <div className="form-group">
                  <label htmlFor="adult_occupancy">Adult Occupancy</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.adult_occupancy}
                    name="adult_occupancy"
                    type="number"
                    className={`form-control ${
                      validationErr.adult_occupancy ? "is-invalid" : ""
                    }`}
                    id="adult_occupancy"
                    placeholder="Enter Room adult_occupancy"
                  />
                  {validationErr.adult_occupancy ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.adult_occupancy}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="child_occupancy">child Occupancy</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.child_occupancy}
                    name="child_occupancy"
                    type="number"
                    className={`form-control ${
                      validationErr.child_occupancy ? "is-invalid" : ""
                    }`}
                    id="child_occupancy"
                    placeholder="Enter Room child_occupancy"
                  />
                  {validationErr.child_occupancy ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.child_occupancy}
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
                <div className="form-group">
                  <label htmlFor="base_occupancy">base Occupancy</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.base_occupancy}
                    name="base_occupancy"
                    type="number"
                    className={`form-control ${
                      validationErr.base_occupancy ? "is-invalid" : ""
                    }`}
                    id="base_occupancy"
                    placeholder="Enter Room base_occupancy"
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
                  <label htmlFor="higher_occupancy">higher Occupancy</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.higher_occupancy}
                    name="higher_occupancy"
                    type="number"
                    className={`form-control ${
                      validationErr.higher_occupancy ? "is-invalid" : ""
                    }`}
                    id="higher_occupancy"
                    placeholder="Enter Room higher_occupancy"
                  />
                  {validationErr.higher_occupancy ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.higher_occupancy}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-check my-4">
                  <input
                    onChange={handleChkChange}
                    className="form-check-input"
                    type="checkbox"
                    name="extra_bed"
                    value={1}
                    id="defaultCheck1"
                  />
                  <label
                    className="form-check-label font-bold"
                    htmlFor="defaultCheck1"
                  >
                    Extra Bed
                  </label>
                </div>

                {/* <div className="form-group">
                  <label htmlFor="extra_bed">Extra Bed</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.extra_bed}
                    name="extra_bed"
                    type="checkbox"
                    className={` ${
                      validationErr.extra_bed ? "is-invalid" : ""
                    }`}
                    id="extra_bed"
                    placeholder="Enter Room extra_bed"
                  />
                  {validationErr.extra_bed ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.extra_bed}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div> */}

                <div className="form-group">
                  <label htmlFor="base_price">Base base_Price</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.base_price}
                    name="base_price"
                    type="text"
                    className={`form-control ${
                      validationErr.base_price ? "is-invalid" : ""
                    }`}
                    id="base_price"
                    placeholder="Enter Room base_Price"
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
                  <label htmlFor="additional_price">
                    Base additional_Price
                  </label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.additional_price}
                    name="additional_price"
                    type="text"
                    className={`form-control ${
                      validationErr.additional_price ? "is-invalid" : ""
                    }`}
                    id="additional_price"
                    placeholder="Enter Room additional_Price"
                  />
                  {validationErr.additional_price ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.additional_price}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="extra_bed_price">Base extra_bed_price</label>
                  <input
                    onChange={handleInputChange}
                    value={roomTypeData.extra_bed_price}
                    name="extra_bed_price"
                    type="text"
                    className={`form-control ${
                      validationErr.extra_bed_price ? "is-invalid" : ""
                    }`}
                    id="extra_bed_price"
                    placeholder="Enter Room extra_bed_price"
                  />
                  {validationErr.extra_bed_price ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.extra_bed_price}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="amenities">amenities</label>
                  <Select
                    isMulti
                    onChange={handleAmenityChange}
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

                <div className="form-group my-2">
                  <button
                    onClick={saveRoomType}
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

export default RoomTypeCreate;
