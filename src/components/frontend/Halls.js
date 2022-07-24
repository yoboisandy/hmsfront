import axios from "../../helpers/instance";
import React, { useEffect, useState } from "react";
import HallCard from "./components/HallCard";
import RoomCard from "./components/RoomCard";
import Spinner from "./components/Spinner";

const Halls = () => {
  const [loading, setLoading] = useState(false);
  const [halls, setHalls] = useState([
    {
      amenities: [],
    },
  ]);

  const token = localStorage.getItem("token");

  const fetchHallType = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/viewhalls`).then((res) => {
      setHalls(res.data);
      console.log(halls);
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchHallType();
  }, []);

  return (
    <div>
      <div className="">
        <div className="bg-indigo-900 h-72 bg-cover bg-center bg-[url('https://technext.github.io/royal/image/about_banner.jpg')] bg-blend-soft-light bg-fixed flex items-center justify-center">
          <div className="text-white ">
            {/* <div className="border-l-4 border-indigo-500 w-6/12 mx-auto"></div> */}
            <h2 className="text-6xl font-semibold tracking-wider border-l-8 border-indigo-500 pl-3 text-center flex items-center">
              <span>Halls</span>
            </h2>
          </div>
        </div>
        {/* check availabiity form */}
        <div className="bg-white relative -top-16 py-5 px-4 md:mx-44 mx-5 md:rounded-full  rounded-lg border-4 border-indigo-300 ">
          <form className="space-y-3">
            <div className="md:flex justify-center  md:gap-3">
              <div className="md:w-1/5 flex flex-col">
                <label htmlFor="checkin">Check In</label>
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  type="date"
                  name="checkin"
                  id="checkin"
                />
              </div>
              <div className="md:w-1/5 flex flex-col">
                <label htmlFor="checkin">Check Out</label>
                <input
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200  text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  type="date"
                  name="checkin"
                  id="checkin"
                />
              </div>
              <div className="md:w-1/5 flex flex-col">
                <label htmlFor="roomtype">Room Type</label>
                <select
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                  name="roomtype_id"
                  id="roomtype"
                >
                  <option value={"all"}>All</option>
                  {halls.map((data) => {
                    return <option value={data.id}>{data.name}</option>;
                  })}
                </select>
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
        <div>
          <h2 className="lg:text-4xl text-3xl font-semibold  pb-3 w-1/3 lg:w-1/4 text-center mx-auto border-b-2 border-indigo-300">
            Our Halls
          </h2>
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-wrap -m-4">
                {loading && <Spinner />}
                {!loading &&
                  halls.map((el, index) => {
                    return <HallCard key={index} {...el} index={index} />;
                  })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Halls;
