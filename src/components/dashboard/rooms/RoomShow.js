import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const RoomShow = () => {
  const [roomData, setRoomData] = useState({
    roomtype: {},
  });
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const token = localStorage.getItem("token");

  const fetchRoom = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/rooms/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoomData(res.data);
      });
    setLoading(false);
    console.log(roomData);
  };

  useEffect(() => {
    fetchRoom();
  }, []);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Room Detail</div>

          <div className="card-tools">
            <Link
              to={`/dashboard/rooms/edit/${id}`}
              className="btn-sm bg-teal mr-1"
            >
              <i className=" fas fa-edit mr-1"></i>Edit
            </Link>
            <Link to="/dashboard/rooms" className="btn-sm bg-indigo">
              <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i> Go
              back
            </Link>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered">
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={9}>
                    <div className="d-flex justify-content-center py-5">
                      <div className="spinner-border text-indigo" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                <>
                  <tr>
                    <th>Room Number</th>
                    <td>{roomData.room_no}</td>
                  </tr>
                  <tr>
                    <th>Floor Number</th>
                    <td>{roomData.floor_id}</td>
                  </tr>
                  <tr>
                    <th>Capacity</th>
                    <td>{roomData.capacity} Person</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>Rs. {roomData.price}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{roomData.description}</td>
                  </tr>
                  <tr>
                    <th>Room Type</th>
                    <td>{roomData.roomtype.type_name}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomShow;
