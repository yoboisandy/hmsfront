import axiosInstance from "../../helpers/instance";
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import UserContext from "../../contexts/UserContext";
import Spinner from "./components/Spinner";

const MyHallBookings = () => {
  const [user, fetchUser] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("");
  const token = localStorage.getItem("token");

  const fetchBooking = async () => {
    setLoading(true);
    await axiosInstance
      .get(`/myhallbookings`)
      .then((res) => {
        setBookings(res.data);
      })
      .then((err) => {
        console.log("something went wrong");
      });
    setLoading(false);
  };

  const cancelBooking = async (id) => {
    await axiosInstance
      .put(`http://localhost:8000/api/changehallbookstatus/${id}`, {
        status: "Canceled",
      })
      .then((res) => {
        // setChangeStatusMsg(res.data.message);
        Swal.fire({
          icon: "success",
          text: res.data.message,
        });
        fetchBooking();
      });
  };
  useEffect(() => {
    fetchBooking();
  }, []);

  return (
    <div>
      {loading && <Spinner />}
      {!loading && (
        <div>
          {/* <div>Your Bookings</div> */}
          <div className="bg-indigo-900 h-72 bg-cover bg-center bg-[url('https://technext.github.io/royal/image/about_banner.jpg')] bg-blend-soft-light bg-fixed flex items-center justify-center">
            <div className="text-white ">
              {/* <div className="border-l-4 border-indigo-500 w-6/12 mx-auto"></div> */}
              <h2 className="text-6xl font-semibold tracking-wider border-l-8 border-indigo-500 pl-3 text-center flex items-center">
                <span>Your Hall Bookings</span>
              </h2>
            </div>
          </div>
          <div className="mx-40 my-16 overflow-x-auto rounded shadow">
            <table className="w-full text-left">
              <thead className="bg-indigo-100 font-medium">
                <tr>
                  <td className="px-6 py-4">SN</td>
                  <td className="px-6 py-4">Room Type</td>
                  <td className="px-6 py-4">Check In</td>
                  <td className="px-6 py-4">Check Out</td>
                  <td className="px-6 py-4">Price</td>
                  <td className="px-6 py-4">Status</td>
                </tr>
              </thead>
              <tbody>
                {bookings.map((el, index) => {
                  return (
                    <tr className="border-b p-20 hover:bg-gray-100 transition-all ease-linear">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4">{el.hall.name}</td>
                      <td className="px-6 py-4">{el.start_date}</td>
                      <td className="px-6 py-4">{el.end_date}</td>
                      <td className="px-6 py-4">{el.hall.price}</td>
                      <td className="px-6 py-4 flex items-center gap-3">
                        <div>{el.status}</div>
                        {el.status === "Pending" && (
                          <button
                            onClick={() => cancelBooking(el.id)}
                            className="p-2 bg-red-600 text-white rounded"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                      <td className="px-6 py-4"></td>
                      {/* <td className="px-6 py-4">
                        {!el.room_id && <span>Not Assigned Yet</span>}
                        {el.room_id && el.room.room_no}
                      </td> */}
                      {/* <td className="px-6 py-4">
                        {el.status === "Canceled" && <span>Canceled</span>}
                        {el.status === "Checked Out" && (
                          <span>Checked Out</span>
                        )}
                        {el.status === "Checked In" && <span>Checked In</span>}
                        {el.status !== "Canceled" &&
                          el.status !== "Checked Out" &&
                          el.status !== "Checked In" && (
                            <form>
                              <select
                                disabled={
                                  el.status === "Canceled" ||
                                  el.status === "Confirmed"
                                }
                                onChange={(e) => {
                                  updateStatus(el.id, e.target.value);
                                }}
                                className="rounded-full"
                                name="status"
                                id="status"
                              >
                                <option
                                  value="Pending"
                                  selected={el.status === "Pending"}
                                >
                                  Pending
                                </option>
                                {el.status === "Confirmed" && (
                                  <option
                                    value="Confirmed"
                                    selected={el.status === "Confirmed"}
                                  >
                                    Confirmed
                                  </option>
                                )}
                                <option
                                  disabled={el.status === "Canceled"}
                                  value="Canceled"
                                  selected={el.status === "Canceled"}
                                >
                                  Cancel
                                </option>
                              </select>
                            </form>
                          )}
                      </td> */}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHallBookings;
