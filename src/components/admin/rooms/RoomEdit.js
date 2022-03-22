import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const RoomEdit = () => {
  const [roomData, setRoomData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
    console.log(roomData);
  };

  let { id } = useParams();

  const updateRoom = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await axios
      .put(
        `http://localhost:8000/api/rooms/${id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        },
        roomData
      )
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/admin/rooms");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };

  const fetchRoom = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/rooms/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoomData({
          room_no: res.data.room_no,
          floor_id: res.data.floor_id,
          capacity: res.data.capacity,
          price: res.data.price,
          description: res.data.description,
          roomtype_id: res.data.roomtype_id,
        });
      });
    setLoading(false);
    console.log(roomData);
  };

  useEffect(() => {
    fetchRoom();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Update Room</div>
              <div className="card-tools">
                <Link to="/admin/rooms" className="btn-sm bg-indigo">
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
                <form onSubmit={updateRoom} method="post">
                  <div className="form-group">
                    <label htmlFor="RoomNumber">Room Number</label>
                    <input
                      onChange={handleInputChange}
                      value={roomData.room_no}
                      name="room_no"
                      type="text"
                      className={`form-control ${
                        validationErr.room_no ? "is-invalid" : ""
                      }`}
                      id="RoomNumber"
                      placeholder="Enter First Name"
                    />
                    {validationErr.room_no ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.room_no}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="floor_id">Floor</label>
                    <input
                      onChange={handleInputChange}
                      value={roomData.floor_id}
                      name="floor_id"
                      type="text"
                      className={`form-control ${
                        validationErr.floor_id ? "is-invalid" : ""
                      }`}
                      id="floor_id"
                      placeholder="Enter Name"
                    />
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
                    <label htmlFor="capacity">Capacity</label>
                    <input
                      onChange={handleInputChange}
                      value={roomData.capacity}
                      name="capacity"
                      type="text"
                      className={`form-control ${
                        validationErr.capacity ? "is-invalid" : ""
                      }`}
                      id="capacity"
                      placeholder="Enter Name"
                    />
                    {validationErr.capacity ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.capacity}
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
                      value={roomData.price}
                      name="price"
                      type="text"
                      className={`form-control ${
                        validationErr.price ? "is-invalid" : ""
                      }`}
                      id="price"
                      placeholder="Enter Price"
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
                    <label htmlFor="description">Description</label>
                    <input
                      onChange={handleInputChange}
                      value={roomData.description}
                      name="description"
                      type="text"
                      className={`form-control ${
                        validationErr.description ? "is-invalid" : ""
                      }`}
                      id="description"
                      placeholder="Enter Description Number"
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
                    <label htmlFor="citizenship_number">Room Type</label>
                    <input
                      onChange={handleInputChange}
                      value={roomData.roomtype_id}
                      name="roomtype_id"
                      type="text"
                      className={`form-control ${
                        validationErr.roomtype_id ? "is-invalid" : ""
                      }`}
                      id="roomtype_id"
                      placeholder="Enter Room Type"
                    />
                    {validationErr.roomtype_id ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.roomtype_id}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  {/* <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={handleInputChange}
                    value={customerData.password}
                    name="password"
                    type="password"
                    className={`form-control ${
                      validationErr.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Enter Password"
                  />
                  {validationErr.password ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.password}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div> */}
                  <div className="form-group my-2">
                    <button
                      onClick={updateRoom}
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

export default RoomEdit;
