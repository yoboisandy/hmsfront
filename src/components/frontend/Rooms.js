import React from "react";
import RoomCard from "./components/RoomCard";

const Rooms = () => {
  return (
    <div>
      <div className="">
        <div className="bg-gray-800 h-72 bg-cover bg-center bg-[url('https://technext.github.io/royal/image/about_banner.jpg')] bg-blend-soft-light flex items-center justify-center">
          <div className="text-white ">
            <h2 className="text-6xl tracking-wider text-center">Rooms</h2>
          </div>
        </div>
      </div>
      <div className="my-28">
        <div>
          <h2 className="text-4xl font-semibold text-center pb-3 w-1/4 mx-auto border-b-2 border-indigo-300">
            Accomodations
          </h2>
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-wrap -m-4">
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
                <RoomCard />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Rooms;
