import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomCard from "./components/RoomCard";
import Spinner from "./components/Spinner";

const Rooms = () => {
  const [loading, setLoading] = useState(false);
  const [DDRoomTypes, setDDRoomTypes] = useState([]);
  const [searched, setSearched] = useState(false);
  const [availability, setAvailability] = useState(true);
  const [notAvailableMsg, setNotAvailableMsg] = useState("");
  const [validationErr, setValidationErr] = useState({});

  const [roomTypes, setRoomTypes] = useState([
    {
      amenities: [],
    },
  ]);
  const token = localStorage.getItem("token");

  const [searchData, setSearchData] = useState({
    start_date: "",
    end_date: "",
    roomtype_id: null,
  });

  const handleInputChange = (e) => {
    setSearchData({ ...searchData, [e.target.name]: e.target.value });
  };

  const viewAvailableFromSearch = async (e) => {
    setLoading(true);
    e.preventDefault();
    setValidationErr({});
    await axios
      .post(`http://localhost:8000/api/viewavailable`, searchData)
      .then((res) => {
        if (res.data.message) {
          setSearched(true);
          setAvailability(false);
          setNotAvailableMsg(res.data.message);
        } else {
          setRoomTypes(res.data);
          setAvailability(true);
          setSearched(true);
        }
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setLoading(false);
  };

  const fetchRoomType = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/viewroomtypes`).then((res) => {
      setRoomTypes(res.data);
    });
    setLoading(false);
  };
  const ddRoomType = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/viewroomtypes`).then((res) => {
      setDDRoomTypes(res.data);
    });
    setLoading(false);
  };
  useEffect(() => {
    ddRoomType();
    fetchRoomType();
  }, []);

  return (
    <div>
      <div className="">
        <div className="bg-indigo-900 h-72 bg-cover bg-center bg-[url('https://technext.github.io/royal/image/about_banner.jpg')] bg-blend-soft-light bg-fixed flex items-center justify-center">
          <div className="text-white ">
            {/* <div className="border-l-4 border-indigo-500 w-6/12 mx-auto"></div> */}
            <h2 className="text-6xl font-semibold tracking-wider border-l-8 border-indigo-500 pl-3 text-center flex items-center">
              <span>Rooms</span>
            </h2>
          </div>
        </div>
        {/* check availabiity form */}
        <div className="bg-white relative -top-16 py-5 px-4 md:mx-44 mx-5 md:rounded-full  rounded-lg border-4 border-indigo-300 ">
          <form onSubmit={viewAvailableFromSearch} className="space-y-3">
            <div className="md:flex justify-center  md:gap-3">
              <div className="md:w-1/5 flex flex-col">
                <label htmlFor="start_date">Check In</label>
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  type="date"
                  onChange={handleInputChange}
                  name="start_date"
                  id="start_date"
                />
                {validationErr && (
                  <div className="text-xs text-red-500 mt-1">
                    {validationErr.start_date}
                  </div>
                )}
              </div>
              <div className="md:w-1/5 flex flex-col">
                <label htmlFor="end_date">Check Out</label>
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  type="date"
                  name="end_date"
                  onChange={handleInputChange}
                  id="end_date"
                />
                {validationErr && (
                  <div className="text-xs text-red-500 mt-1">
                    {validationErr.end_date}
                  </div>
                )}
              </div>
              <div className="md:w-1/5 flex flex-col">
                <label htmlFor="roomtype">Room Type</label>
                <select
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  name="roomtype_id"
                  onChange={handleInputChange}
                  id="roomtype"
                >
                  <option disabled selected>
                    Select type
                  </option>
                  {DDRoomTypes.map((data) => {
                    return <option value={data.id}>{data.type_name}</option>;
                  })}
                </select>
                {validationErr && (
                  <div className="text-xs text-red-500 mt-1">
                    {validationErr.roomtype_id}
                  </div>
                )}
              </div>
              <div className="md:w-1/5 flex flex-col">
                <button
                  type="submit"
                  className="text-white mt-3 bg-indigo-500 border-0 py-2 px-3 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Check Availability
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="my-8">
        <h2 className="lg:text-4xl text-3xl font-semibold  pb-3 w-1/3 lg:w-1/4 text-center mx-auto border-b-2 border-indigo-300">
          Our Rooms
        </h2>
        <div>
          <section className="text-gray-600 body-font">
            {searched && availability && (
              <div className="text-center mt-5 font-medium">
                Room Available for {searchData.start_date} to{" "}
                {searchData.end_date}:
              </div>
            )}
            <div className="container px-5 py-12 mx-auto">
              {loading && <Spinner />}
              {!loading && (
                <>
                  {searched && !availability && (
                    <div className="font-medium  text-center">
                      {notAvailableMsg}
                    </div>
                  )}

                  {availability && (
                    <div className="flex flex-wrap -m-4">
                      {roomTypes.map((el, index) => {
                        return <RoomCard key={index} {...el} index={index} />;
                      })}
                    </div>
                  )}
                </>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
