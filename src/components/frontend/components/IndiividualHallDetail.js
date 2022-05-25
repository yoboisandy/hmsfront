import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const IndividualHallDetail = ({
  id,
  image,
  name,
  description,
  amenities,
  price,
  user,
}) => {
  const [checkAvailabilityData, setcheckAvailabilityData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [validationErr, setValidationErr] = useState({});
  const [availability, setAvailability] = useState(null);
  const [notAvailableMsg, setNotAvailableMsg] = useState("");

  let navigate = useNavigate();

  const handleInput = (e) => {
    setcheckAvailabilityData({
      ...checkAvailabilityData,
      [e.target.name]: e.target.value,
    });
  };

  const checkAvailability = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    setValidationErr({});
    setAvailability(false);
    setNotAvailableMsg("");
    await axios
      .post(`http://localhost:8000/api/hallavailability`, {
        ...checkAvailabilityData,
        hall_id: id,
      })
      .then((res) => {
        if (res.data.message) {
          setAvailability(true);
        } else {
          setNotAvailableMsg(res.data.error);
        }
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };

  const bookHall = async () => {
    setBtnLoading(true);

    if (user.role === "") {
      navigate("/login");
    } else if (user.role && user.role !== "Customer") {
      navigate("/");
    } else {
      await axios
        .post(
          `http://localhost:8000/api/book-hall`,
          {
            ...checkAvailabilityData,
            hall_id: id,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          if (res.data.message === "no hall available") {
            Swal.fire({
              title: "Sorry",
              icon: "error",
              text: "No room available",
            });
          } else {
            Swal.fire({
              title: "Success",
              icon: "success",
              text: "Booking Request Sent Successfully",
            });
            navigate("/myhallbookings");
          }
        })
        .catch((err) => {
          setValidationErr(err.response.data.errors);
        });
    }
    setBtnLoading(false);
  };

  return (
    <div>
      <div className="mx-16 my-16">
        <div className="md:flex justify-between gap-12 ">
          <div className="md:w-8/12">
            <div>
              <img src={`http://localhost:8000/storage/${image}`} alt="" />
            </div>
            <div className="my-10">
              <h2 className="my-3 font-bold text-2xl">{name}</h2>
              <p>{description}</p>
            </div>
            <div>
              <div>
                <h2 className="my-4 font-bold text-2xl border-b-2 border-indigo-500 w-1/12 pb-2">
                  Amenities
                </h2>
              </div>
              <div>
                <div>
                  <div className="mt-10">
                    <section class="text-gray-600 body-font">
                      <div class=" py-18 mx-auto">
                        <div class="flex flex-wrap -m-4">
                          {amenities.map((amenity) => {
                            return (
                              <div class="xl:w-1/3 md:w-1/2 p-4">
                                <div class="border border-gray-200 p-6 rounded-lg flex flex-col items-center">
                                  <div class="w-28 h-1w-28 inline-flex items-center justify-center rounded-full bg-indigo-100 p-4 text-indigo-500 mb-4">
                                    <img
                                      src={`http://localhost:8000/storage/${amenity.icon}`}
                                      className="w-full"
                                    />
                                  </div>
                                  <h2 class="text-lg text-gray-900 font-medium title-font mb-2">
                                    {amenity.name}
                                  </h2>
                                  {/* <p class="leading-relaxed text-base">
                                    {amenity.description}
                                  </p> */}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-4/12 md:mt-0 mt-4">
            <div className="bg-indigo-500 p-3 font-bold text-white">{name}</div>
            <div className="border-2 pb-4 border-indigo-400 px-3">
              <form onSubmit={checkAvailability}>
                <div className="flex gap-2">
                  <div className="py-4 w-1/2 space-y-2">
                    <label htmlFor="checkin">From</label>
                    <input
                      onChange={handleInput}
                      type="date"
                      value={checkAvailabilityData.start_date}
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="start_date"
                      id="checkin"
                    />
                    {validationErr && (
                      <div className="text-xs text-red-500 mt-1">
                        {validationErr.start_date}
                      </div>
                    )}
                  </div>
                  <div className="py-4 w-1/2 space-y-2">
                    <label htmlFor="checkout">To</label>
                    <input
                      onChange={handleInput}
                      type="date"
                      value={checkAvailabilityData.end_date}
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name="end_date"
                      id="checkout"
                    />
                    {validationErr && (
                      <div className="text-xs text-red-500 mt-1">
                        {validationErr.end_date}
                      </div>
                    )}
                  </div>
                </div>
                <div className="py-4 space-y-2">
                  <label htmlFor="capacity">People</label>
                  <input
                    onChange={handleInput}
                    type="number"
                    value={checkAvailabilityData.capacity}
                    className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    name="capacity"
                    placeholder="no. of People"
                    id="capacity"
                  />
                  {validationErr && (
                    <div className="text-xs text-red-500 mt-1">
                      {validationErr.capacity}
                    </div>
                  )}
                </div>
                <center>
                  <button className="p-2 rounded-md mt-4 text-center w-3/4 text-white  bg-indigo-500 hover:bg-indigo-700 font-semibold">
                    {btnLoading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm mr-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span>Checking...</span>
                      </>
                    ) : (
                      "Check Availability"
                    )}
                  </button>
                  {notAvailableMsg && (
                    <div className="text-xs text-center text-red-500 mt-3">
                      <i class="fas fa-times-circle mr-1"></i>
                      {notAvailableMsg}
                    </div>
                  )}
                  {availability && (
                    <>
                      <center className="text-green-400 mt-3">
                        <i class="fas fa-check-circle mr-1"></i> Hall is
                        available
                      </center>
                      <button
                        className="p-2 rounded-md mt-4 text-center w-3/4 text-white bg-indigo-500 hover:bg-indigo-700 font-semibold"
                        onClick={bookHall}
                      >
                        Book Hall
                      </button>
                    </>
                  )}
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualHallDetail;
