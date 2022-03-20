import React from "react";
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
            <h2 className="font-bold text-5xl md:text-6xl my-4 tracking-wider text-center">
              Relax Your Mind
            </h2>
            <p className="text-center px-12 md:px-64">
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
    </div>
  );
};

export default Home;
