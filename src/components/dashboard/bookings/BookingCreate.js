import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import Select from "react-select";

const DepartmentCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const [roomTypes, setRoomTypes] = useState([]);
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [bookingData, setbookingData] = useState({
    roomtype_id: null,
  });
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setbookingData({ ...bookingData, [e.target.name]: e.target.value });
    console.log(bookingData);
  };

  const getRoomtypes = async () => {
    await axios
      .get(`http://localhost:8000/api/roomtypes`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoomTypes(res.data);
      });
  };

  const getRooms = async () => {
    await axios
      .get(`http://localhost:8000/api/roomtypes/${bookingData.roomtype_id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRooms(res.data.rooms);
        console.log(res.data.rooms);
      });
  };

  const saveBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:8000/api/bookings", {
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
        navigate("/dashboard/bookings");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setLoading(false);
  };
  useEffect(() => {
    getRoomtypes();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">New Booking</div>
              <div className="card-tools">
                <Link to="/dashboard/bookings" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body">
              <form onSubmit={saveBooking} method="post">
                <div className="form-group">
                  <label htmlFor="name">Room Type</label>
                  <select
                    onChange={(e) => {
                      handleInputChange(e);
                      getRooms();
                    }}
                    name="roomtype_id"
                    className={`form-control ${
                      validationErr.roomtype_id ? "is-invalid" : ""
                    }`}
                    id="roomtype_id"
                    placeholder="Enter Department Name"
                  >
                    <option value="" selected disabled>
                      Select Room Type
                    </option>
                    {roomTypes.map((el) => {
                      return <option value={el.id}>{el.type_name}</option>;
                    })}
                  </select>
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
                <div className="form-group">
                  <label htmlFor="start_date">Check In</label>
                  <input
                    type="date"
                    onChange={handleInputChange}
                    name="start_date"
                    className={`form-control ${
                      validationErr.start_date ? "is-invalid" : ""
                    }`}
                    id="roomtype_id"
                    placeholder="Enter Department Name"
                  />
                  {validationErr.start_date ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.start_date}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="end_date">Check Out</label>
                  <input
                    type="date"
                    onChange={handleInputChange}
                    name="end_date"
                    className={`form-control ${
                      validationErr.end_date ? "is-invalid" : ""
                    }`}
                    id="roomtype_id"
                    placeholder="Enter Department Name"
                  />
                  {validationErr.end_date ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.end_date}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="room_id">Room Number</label>
                  <select
                    onChange={handleInputChange}
                    name="room_id"
                    className={`form-control ${
                      validationErr.room_id ? "is-invalid" : ""
                    }`}
                    id="room_id"
                    placeholder="Enter Department Name"
                  >
                    <option selected disabled>
                      Select Room Number
                    </option>
                    {rooms.map((el) => {
                      return <option value={el.id}>{el.room_no}</option>;
                    })}
                  </select>
                  {validationErr.room_id ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.room_id}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group my-2">
                  <button
                    onClick={saveBooking}
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

export default DepartmentCreate;
