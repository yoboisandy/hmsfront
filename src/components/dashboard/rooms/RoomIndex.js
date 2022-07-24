import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import axiosInstance from "../../../helpers/instance";
const RoomIndex = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchRooms = async () => {
    setLoading(true);
    await axiosInstance
      .get("http://localhost:8000/api/rooms")
      .then((res) => {
        setRooms(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (id) => {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      return res.isConfirmed;
    });

    if (isConfirmed) {
      await axiosInstance
        .delete(`http://localhost:8000/api/rooms/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          fetchRooms();
        })
        .catch((err) => {
          if (err.response.status === 500) {
            Swal.fire({
              text: "Status " + err.response.status + ": Something went wrong!",
              icon: "error",
            });
          } else {
            Swal.fire({
              text: "Status " + err.response.status + ": Something went wrong!",
              icon: "error",
            });
          }
        });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Rooms</div>
              <div className="card-tools">
                <Link to="/dashboard/rooms/create" className="btn-sm bg-indigo">
                  <i className="fas fa-plus-circle mr-1"></i> Add New
                </Link>
              </div>
            </div>
            <div className="card-body p-0" style={{ overflowX: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead className="bg-indigo">
                  <tr className="text-center">
                    <th>SN</th>
                    {/* <th>Image</th> */}
                    <th>Room Number</th>
                    <th>Floor Name</th>
                    <th>Capacity</th>
                    <th>Price</th>
                    <th>Type</th>
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
                        {/* <td>
                          <img src={room.roomtype.image} alt="" />
                        </td> */}
                        <td>{room.room_no}</td>
                        <td>{room.floor.name}</td>
                        <td>{room.roomtype.occupancy} Person</td>
                        <td>Rs. {room.roomtype.price}</td>
                        <td>{room.roomtype.type_name}</td>
                        <td className="d-flex justify-content-center">
                          <Link
                            to={`/dashboard/rooms/${room.id}`}
                            className="btn-sm bg-success mr-1"
                          >
                            <i className="fa fa-eye"> </i>
                          </Link>
                          <Link
                            to={`/dashboard/rooms/edit/${room.id}`}
                            className="btn-sm bg-teal mr-1"
                          >
                            <i className=" fas fa-edit"> </i>
                          </Link>
                          {/* <span
                            onClick={() => handleDelete(room.id)}
                            className="btn-sm bg-danger mr-1"
                          >
                            <i className="fas fa-trash-alt"> </i>
                          </span> */}
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
