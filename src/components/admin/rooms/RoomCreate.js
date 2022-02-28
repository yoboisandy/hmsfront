import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const RoomCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({});
  const [loading, setLoading] = useState(false);
  const handleInputChange = (e) => {
    setRoomData({ ...roomData, [e.target.name]: e.target.value });
    console.log(roomData);
  };
  const saveRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("http://localhost:8000/api/rooms", roomData)
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
                <Link to="/admin/rooms" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveRoom} method="post">
                <div className="form-group">
                  <label htmlFor="RoomNumber">Room Number</label>
                  <input
                    onChange={handleInputChange}
                    value={roomData.room_no}
                    name="room_no"
                    type="text"
                    className={`form-control ${
                      validationErr.firstname ? "is-invalid" : ""
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
                  <label htmlFor="floor_id">Last Name</label>
                  <input
                    onChange={handleInputChange}
                    value={roomData.lastname}
                    name="floor_id"
                    type="text"
                    className={`form-control ${
                      validationErr.floor_id ? "is-invalid" : ""
                    }`}
                    id="floor_id"
                    placeholder="Enter Name"
                  />
                  {validationErr.lastname ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.lastname}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    onChange={handleInputChange}
                    value={roomData.email}
                    name="email"
                    type="text"
                    className={`form-control ${
                      validationErr.email ? "is-invalid" : ""
                    }`}
                    id="email"
                    placeholder="Enter Name"
                  />
                  {validationErr.email ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.email}
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
                          class="spinner-border spinner-border-sm mr-2"
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
