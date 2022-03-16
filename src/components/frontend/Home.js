import React from "react";
import RoomCard from "./components/RoomCard";
const Home = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-black relative">
        <div className="h-screen bg-[url('https://technext.github.io/royal/image/banner_bg.jpg')] opacity-40"></div>
        <div className="flex absolute top-0 justify-center text-white py-52">
          <div className="flex flex-col items-center">
            <h6
              className="font-light text-md text-center
             uppercase tracking-widest"
            >
              Away from monotonous life
            </h6>
            <h2 className="font-bold text-6xl my-4 tracking-wider text-center">
              Relax Your Mind
            </h2>
            <p className="text-center px-80">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
              optio consectetur consequuntur perspiciatis nulla provident soluta
            </p>
            <a
              href="#"
              className="p-2 rounded-md mt-4 text-center  bg-indigo-700 hover:bg-indigo-900 font-semibold"
            >
              Book Your Stay
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 inline h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
      {/* Accomodation */}
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

export default Home;
