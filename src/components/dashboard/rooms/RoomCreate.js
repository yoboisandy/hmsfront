import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const RoomCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [roomData, setroomData] = useState({});
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomtypes, setRoomTypes] = useState([]);
  const [floors, setFloors] = useState([]);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setroomData({ ...roomData, [e.target.name]: e.target.value });
    console.log(roomData);
  };

  const getFloors = async () => {
    await axios
      .get("http://localhost:8000/api/floors", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFloors(res.data);
      });
  };
  const getRoomTypes = async () => {
    await axios
      .get("http://localhost:8000/api/roomtypes", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoomTypes(res.data);
      });
  };

  useEffect(() => {
    getFloors();
    getRoomTypes();
  }, []);

  const saveRoom = async (e) => {
    e.preventDefault();

    setLoading(true);
    const fd = new FormData();
    fd.append("room_no", roomData.room_no);
    fd.append("floor_id", roomData.floor_id);
    fd.append("roomtype_id", roomData.roomtype_id);

    await axios
      .post("http://localhost:8000/api/rooms", fd, {
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
        navigate("/dashboard/rooms");
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
              <div className="card-title text-lg">Add Room</div>
              <div className="card-tools">
                <Link to="/dashboard/rooms" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveRoom} method="post">
                <div className="form-group">
                  <label htmlFor="room_no">Room Number</label>
                  <input
                    onChange={handleInputChange}
                    value={roomData.room_no}
                    name="room_no"
                    type="text"
                    className={`form-control ${
                      validationErr.room_no ? "is-invalid" : ""
                    }`}
                    id="room_no"
                    placeholder="Enter Room Number"
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
                  <label htmlFor="floor_id">Floor Number</label>
                  <select
                    className={`form-control ${
                      validationErr.floor_id ? "is-invalid" : ""
                    }`}
                    onChange={handleInputChange}
                    value={roomData.floor_id}
                    name="floor_id"
                    id="floor_id"
                  >
                    <option disabled selected>
                      Select Floor Number
                    </option>
                    {floors.map((floor) => {
                      return (
                        <option
                          selected={roomData.floor_id == floor.id}
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
                  <label htmlFor="roomtype_id">Room Type</label>
                  <select
                    className={`form-control ${
                      validationErr.roomtype_id ? "is-invalid" : ""
                    }`}
                    onChange={handleInputChange}
                    value={roomData.roomtype_id}
                    name="roomtype_id"
                    id="roomtype_id"
                  >
                    <option disabled selected>
                      Select Room Type
                    </option>
                    {roomtypes.map((roomtype) => {
                      return (
                        <option
                          selected={roomData.roomtype_id == roomtype.id}
                          value={roomtype.id}
                        >
                          {roomtype.type_name}
                        </option>
                      );
                    })}
                  </select>
                  {validationErr.rooomtype_id ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.roomtype_id}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>

                <div className="form-group my-2">
                  <button
                    onClick={saveRoom}
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

export default RoomCreate;
