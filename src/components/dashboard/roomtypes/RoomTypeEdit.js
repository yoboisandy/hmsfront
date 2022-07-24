import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";
import axios from "../../../helpers/instance";
import Spinner from "../../frontend/components/Spinner";

const RoomTypeCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [amenities, setAmenities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const [roomTypeData, setroomTypeData] = useState({
    type_name: "",
    description: "",
    occupancy: "",
    price: "",
  });
  // const [roomTypeData, setroomTypeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [chk, setChk] = useState(0);
  const [btnLoading, setBtnLoading] = useState(false);
  const token = localStorage.getItem("token");
  let { id } = useParams();
  const fecthRoomTypeData = () => {
    setLoading(true);
    axios.get(`http://localhost:8000/api/roomtypes/${id}`).then((res) => {
      setroomTypeData(res.data);
      setSelectedAmenities(res.data.amenities);
    });
    setLoading(false);
  };

  const getAmenities = async () => {
    setLoading(true);

    axios.get(`http://localhost:8000/api/amenities`).then((res) => {
      setAmenities(res.data);
    });
    setLoading(false);
  };

  const amenitiesOptions = [];
  amenities.map((amenity) => {
    amenitiesOptions.push({ label: amenity.name, value: amenity.id });
  });

  let selectedAmenitiesOption = [];
  selectedAmenities.map((amenity) => {
    selectedAmenitiesOption.push({ value: amenity.id, label: amenity.name });
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
    setBtnLoading(true);
    let values = selectedAmenities.map((val) => val.value);
    // console.log(values);
    const fd = new FormData();
    fd.append("type_name", roomTypeData.type_name);
    fd.append("description", roomTypeData.description);
    fd.append("occupancy", roomTypeData.occupancy);
    fd.append("price", roomTypeData.price);
    fd.append("_method", "PUT");
    // fd.append("amenities[]", values);
    values.forEach((item) => {
      fd.append("amenities[]", item);
    });
    fd.append("extra_bed", chk);
    fd.append("image", image);
    console.log(fd.get("amenities"));

    await axios
      .post(`http://localhost:8000/api/roomtypes/${id}`, fd)
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
    setBtnLoading(false);
  };

  useEffect(() => {
    fecthRoomTypeData();
    console.log(selectedAmenitiesOption);
  }, []);

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
              {loading && (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-indigo" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              )}
              {!loading && (
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
                    <label htmlFor="occupancy">Occupancy</label>
                    <input
                      onChange={handleInputChange}
                      value={roomTypeData.occupancy}
                      name="occupancy"
                      type="number"
                      className={`form-control ${
                        validationErr.occupancy ? "is-invalid" : ""
                      }`}
                      id="occupancy"
                      placeholder="Enter Room occupancy"
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

                  <div className="form-group">
                    <label htmlFor="image">Photo</label>
                    <input
                      onChange={(e) => handleImageChange(e.target.files)}
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
                    <img
                      src={`http://localhost:8000/storage/${roomTypeData.image}`}
                      width={400}
                      className="mt-2"
                      alt=""
                    />
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
                    <label htmlFor="price">Price</label>
                    <input
                      onChange={handleInputChange}
                      value={roomTypeData.price}
                      name="price"
                      type="text"
                      className={`form-control ${
                        validationErr.price ? "is-invalid" : ""
                      }`}
                      id="price"
                      placeholder="Enter Room base_Price"
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

                  {/* <div className="form-group">
                    <label htmlFor="amenities">amenities</label>
                    <Select
                      isMulti
                      onChange={handleAmenityChange}
                      defaultValue={selectedAmenitiesOption}
                      value={selectedAmenities}
                      options={amenitiesOptions}
                      name="amenities"
                      className={`${
                        validationErr.amenities ? "is-invalid" : ""
                      }`}
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

                  <div className="form-group my-2">
                    <button
                      onClick={saveRoomType}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeCreate;
