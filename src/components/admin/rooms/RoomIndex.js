import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
const RoomIndex = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8000/api/rooms")
      .then((res) => {
        setRooms(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Rooms</div>
              <div className="card-tools">
                <Link to="/admin/rooms/create" className="btn-sm bg-indigo">
                  <i className="fas fa-plus-circle mr-1"></i> Add New
                </Link>
              </div>
            </div>
            <div className="card-body p-0" style={{ overflowX: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead className="bg-indigo">
                  <tr className="text-center">
                    <th>SN</th>
                    <th>Room Number</th>
                    <th>Floor</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th>Description</th>
                    <th>Room Type</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={9}>
                        <div className="d-flex justify-content-center py-5">
                          <div
                            className="spinner-border text-indigo"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                  {rooms.map((room, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{room.room_no}</td>
                        <td>{room.floor.name}</td>
                        <td>{room.capacity} Person</td>
                        <td>{room.price}</td>
                        <td>{room.description}</td>
                        <td>{room.roomtype.type_name}</td>
                        
                        <td className="d-flex justify-content-center">
                          <Link to="/" className="btn-sm bg-success mr-1">
                            <i className="fa fa-eye"> </i>
                          </Link>
                          <Link to="/rooms" className="btn-sm bg-teal mr-1">
                            <i className=" fas fa-edit"> </i>
                          </Link>
                          <Link to="/" className="btn-sm bg-danger mr-1">
                            <i className="fas fa-trash-alt"> </i>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomIndex;
