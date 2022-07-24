import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import axios from "../../../helpers/instance";
const BookingEdit = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeStatusMsg, setChangeStatusMsg] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8000/api/viewbookings")
      .then((res) => {
        setBookings(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    setLoading(false);
  };

  // const handleStatusChange = (e) => {
  //   setBookingStatus({ ...bookingStatus, [e.target.name]: e.target.value });
  // };

  const assignRoom = async (id, room_id) => {
    await axios
      .put(`http://localhost:8000/api/assignRoom/${id}`, {
        room_id: room_id,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        });
      });
  };

  const updateStatus = async (id, status) => {
    await axios
      .put(`http://localhost:8000/api/changestatus/${id}`, {
        status: status,
      })
      .then((res) => {
        // setChangeStatusMsg(res.data.message);
        Swal.fire({
          icon: "success",
          text: res.data.message,
        });
      });
  };

  useEffect(() => {
    fetchBookings();
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
      await axios
        .delete(`http://localhost:8000/api/bookings/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          fetchBookings();
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
              <div className="card-title text-lg">Bookings</div>
              <div className="card-tools">
                <Link
                  to="/dashboard/bookings/create"
                  className="btn-sm bg-indigo"
                >
                  <i className="fas fa-plus-circle mr-1"></i> Add New
                </Link>
              </div>
            </div>
            <div className="card-body p-0" style={{ overflowX: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead className="bg-indigo">
                  <tr className="text-center">
                    <th>SN</th>
                    <th>User</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Room Type</th>
                    <th>Room Number</th>
                    <th>Price</th>
                    <th>Status</th>
                    {/* <th>Actions</th> */}
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
                  {bookings.map((booking, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{booking.user.name}</td>
                        <td>{booking.start_date}</td>
                        <td>{booking.end_date}</td>
                        <td>{booking.roomtype.type_name}</td>
                        <td>
                          <select
                            onChange={(e) => {
                              assignRoom(booking.id, e.target.value);
                            }}
                            className="form-control "
                            name="room_id"
                          >
                            <option selected disabled>
                              Assign Room
                            </option>
                            {booking.roomtype.rooms.map((el) => (
                              <option
                                selected={booking.room_id === el.id}
                                value={el.id}
                              >
                                {el.room_no}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td>{booking.price}</td>
                        <td>
                          <form>
                            <select
                              className="form-control"
                              onChange={(e) => {
                                updateStatus(booking.id, e.target.value);
                              }}
                              name="status"
                              id="status"
                            >
                              <option
                                value="Pending"
                                selected={booking.status === "Pending"}
                              >
                                Pending
                              </option>
                              <option
                                value="Confirmed"
                                selected={booking.status === "Confirmed"}
                              >
                                Confirmed
                              </option>
                              <option
                                value="Canceled"
                                selected={booking.status === "Canceled"}
                              >
                                Cancel
                              </option>
                            </select>
                          </form>
                        </td>

                        {/*<td className="d-flex justify-content-center">
                           <Link
                            to={`/dashboard/bookings/${booking.id}`}
                            className="btn-sm bg-success mr-1"
                          >
                            <i className="fa fa-eye"> </i>
                          </Link>
                          <Link
                            to={`/dashboard/bookings/edit/${booking.id}`}
                            className="btn-sm bg-teal mr-1"
                          >
                            <i className=" fas fa-edit"> </i>
                          </Link> 
                          <span
                            onClick={() => handleDelete(booking.id)}
                            className="btn-sm bg-danger mr-1"
                          >
                            <i className="fas fa-trash-alt"> </i>
                          </span>
                        </td>*/}
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

export default BookingEdit;
