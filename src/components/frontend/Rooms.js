import axios from "axios";
import React, { useEffect, useState } from "react";
import RoomCard from "./components/RoomCard";
import Spinner from "./components/Spinner";

const Rooms = () => {
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchRoomType = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/viewroomtypes`).then((res) => {
      setRoomTypes(res.data);
    });
    setLoading(false);
  };
  useEffect(() => {
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
      </div>
      <div className="my-20">
        <div>
          <h2 className="lg:text-4xl text-3xl font-semibold  pb-3 w-1/3 lg:w-1/4 text-center mx-auto border-b-2 border-indigo-300">
            Accomodations
          </h2>
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-12 mx-auto">
              <div className="flex flex-wrap -m-4">
                {loading && <Spinner />}
                {roomTypes.map((el, index) => {
                  return <RoomCard {...el} index={index} />;
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
