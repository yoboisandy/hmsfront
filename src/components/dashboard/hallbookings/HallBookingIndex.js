import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import axiosInstance from "../../../helpers/instance";
const HallBookingIndex = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeStatusMsg, setChangeStatusMsg] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const token = localStorage.getItem("token");

  const fetchBookings = async () => {
    setLoading(true);
    await axiosInstance
      .get("http://localhost:8000/api/hallbooks")
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

  const updateStatus = async (id, status, hall_id) => {
    await axiosInstance
      .post(`http://localhost:8000/api/changehallbookstatus/${id}`, {
        status: status,
        _method: "PUT",
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        });
      });
    fetchBookings();
  };
  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Hall Bookings</div>
            </div>
            <div className="card-body p-0" style={{ overflowX: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead className="bg-indigo">
                  <tr className="text-center">
                    <th>SN</th>
                    <th>User</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Hall</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
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
                  )}
                  {!loading &&
                    bookings.map((booking, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          {/* <td>{booking.id}</td> */}
                          <td>{booking.user.name}</td>
                          <td>{booking.start_date}</td>
                          <td>{booking.end_date}</td>
                          <td>{booking.hall.name}</td>
                          <td>{booking.hall.price}</td>
                          <td>
                            <form>
                              <select
                                className="form-control"
                                disabled={
                                  booking.status === "Checked Out" ||
                                  booking.status === "Canceled"
                                }
                                onChange={(e) => {
                                  updateStatus(
                                    booking.id,
                                    e.target.value,
                                    booking.hall_id
                                  );
                                }}
                                name="status"
                                id="status"
                              >
                                {booking.status === "Pending" && (
                                  <option
                                    value="Pending"
                                    selected={booking.status === "Pending"}
                                  >
                                    Pending
                                  </option>
                                )}
                                {(booking.status === "Pending" ||
                                  booking.status === "Confirmed") && (
                                  <option
                                    value="Confirmed"
                                    selected={booking.status === "Confirmed"}
                                  >
                                    Confirmed
                                  </option>
                                )}
                                {(booking.status === "Confirmed" ||
                                  booking.status === "Checked In") && (
                                  <option
                                    value="Checked In"
                                    selected={booking.status === "Checked In"}
                                  >
                                    Checked In
                                  </option>
                                )}
                                {(booking.status === "Checked In" ||
                                  booking.status === "Checked Out") && (
                                  <option
                                    value="Checked Out"
                                    selected={booking.status === "Checked Out"}
                                  >
                                    Checked Out
                                  </option>
                                )}
                                {(booking.status === "Pending" ||
                                  booking.status === "Canceled" ||
                                  booking.status === "Confirmed") && (
                                  <option
                                    value="Canceled"
                                    selected={booking.status === "Canceled"}
                                  >
                                    Cancel
                                  </option>
                                )}
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

export default HallBookingIndex;
