import axiosInstance from "../../helpers/instance";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import Fade from "react-reveal/Fade";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination, Autoplay, Navigation } from "swiper";
import { Link } from "react-router-dom";
const Home = () => {
  const [count, setCount] = useState({});

  const fetchCount = async () => {
    await axiosInstance.get(`http://localhost:8000/api/count`).then((res) => {
      setCount(res.data);
    });
  };

  useEffect(() => {
    fetchCount();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-black relative">
        <div className="h-screen bg-[url('https://technext.github.io/royal/image/banner_bg.jpg')] opacity-40"></div>
        <div className="flex absolute top-0 justify-center text-white py-52">
          <div className="flex flex-col items-center">
            <Fade right>
              <h6
                className="font-light text-md text-center
             uppercase tracking-widest"
              >
                Away from monotonous life
              </h6>
            </Fade>
            <h2 className="font-bold text-5xl md:text-6xl my-4 tracking-wider text-center">
              <Fade left>Relax Your Mind</Fade>
            </h2>
            <p className="text-center mb-5 px-12 md:px-64">
              <Fade right>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste
                optio consectetur consequuntur perspiciatis nulla provident
                soluta
              </Fade>
            </p>
            <div>
              <Fade left>
                <Link
                  to="/rooms"
                  className="p-2 rounded-md mt-10 text-center  bg-indigo-700 hover:bg-indigo-900 font-semibold"
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
                </Link>
              </Fade>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <section className="text-gray-600 body-font mx-40">
        <div className="container px-5 py-6 mx-auto">
          <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl border-b-2 pb-3 border-indigo-500 font-medium title-font mb-2 text-gray-900">
              Services
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos
              blanditiis facere repellat illo adipisci.
            </p>
          </div>
          <Fade bottom>
            <div className="flex flex-wrap -m-4">
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg flex flex-col justify-center items-center">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/baby.png" alt="" />
                  </div>
                  <h2 className="text-lg text-center text-gray-900 font-medium title-font mb-2">
                    Baby Sitter
                  </h2>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/doctor.png" alt="" />
                  </div>
                  <h2 className="text-lg text-gray-900 font-semibold title-font text-center">
                    Doctor on Call
                  </h2>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/credit-cards.png" alt="" />
                  </div>
                  <h2 className="text-lg text-gray-900 font-semibold title-font text-center">
                    Cards Accepted
                  </h2>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/car-rent.png" alt="" />
                  </div>
                  <h2 className="text-lg text-gray-900 font-semibold title-font text-center">
                    Rent a Car
                  </h2>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/dry-cleaning.png" alt="" />
                  </div>
                  <h2 className="text-lg text-gray-900 font-semibold title-font text-center">
                    Dry Cleaning
                  </h2>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/pool.png" alt="" />
                  </div>
                  <h2 className="text-lg text-gray-900 font-semibold title-font text-center">
                    Swimming Pool
                  </h2>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/restaurant.png" alt="" />
                  </div>
                  <h2 className="text-lg text-gray-900 font-semibold title-font text-center">
                    Restaurant
                  </h2>
                </div>
              </div>
              <div className="xl:w-1/4 md:w-1/2 p-4 flex justify-center flex-col items-center">
                <div className="border border-gray-200 p-6 rounded-lg">
                  <div className="w-28 h-28 mx-auto p-5 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-4">
                    <img src="services/parking.png" alt="" />
                  </div>
                  <h2 className="text-lg text-gray-900 font-semibold title-font text-center">
                    Parking
                  </h2>
                </div>
              </div>
            </div>
          </Fade>
        </div>
      </section>

      {/* Testimonials */}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl border-b-2 pb-3 border-indigo-500 font-medium title-font mb-2 text-gray-900">
              Testimonials
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos
              blanditiis facere repellat illo adipisci.
            </p>
          </div>

          <div className="flex flex-wrap -m-4">
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                },
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 2,
                },
              }}
              autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
              navigation={true}
              modules={[Autoplay, Pagination, Navigation]}
              className="mySwiper"
            >
              <SwiperSlide>
                <div className="p-4  w-full">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      className="block w-5 h-5 text-indigo-500 mb-4"
                      viewBox="0 0 975.036 975.036"
                    >
                      <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z" />
                    </svg> */}
                    <p className="leading-relaxed mb-6">
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </p>
                    <a className="inline-flex items-center">
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-indigo-700">
                          Holden Caulfield
                        </span>
                        <span className="text-gray-500 text-sm">
                          UI DEVELOPER
                        </span>
                      </span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-4  w-full">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <p className="leading-relaxed mb-6">
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </p>
                    <a className="inline-flex items-center">
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-indigo-700">
                          Alper Kamu
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <div className="p-4  w-full">
                  <div className="h-full bg-gray-100 p-8 rounded">
                    <p className="leading-relaxed mb-6">
                      Synth chartreuse iPhone lomo cray raw denim brunch
                      everyday carry neutra before they sold out fixie 90's
                      microdosing. Tacos pinterest fanny pack venmo, post-ironic
                      heirloom try-hard pabst authentic iceland.
                    </p>
                    <a className="inline-flex items-center">
                      <span className="flex-grow flex flex-col pl-4">
                        <span className="title-font font-medium text-indigo-700">
                          Alper Kamu
                        </span>
                        <span className="text-gray-500 text-sm">DESIGNER</span>
                      </span>
                    </a>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </section>

      {/* stats */}
      <section className="text-white body-font bg-[url('https://technext.github.io/royal/image/about_banner.jpg')] bg-center bg-gray-800 bg-blend-soft-light bg-fixed">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4 text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
                {count.room}
              </h2>
              <p className="leading-relaxed">Rooms</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
                {count.hall}
              </h2>
              <p className="leading-relaxed">Halls</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
                {count.customer}
              </h2>
              <p className="leading-relaxed">Customers</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font font-medium sm:text-4xl text-3xl text-gray-200">
                {count.roomtype}
              </h2>
              <p className="leading-relaxed">Room Types</p>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="text-gray-600 body-font">
        <div className=" pt-24 mx-auto">
          <div className="flex flex-wrap w-full mb-12 flex-col items-center text-center">
            <h1 className="sm:text-3xl text-2xl border-b-2 pb-3 border-indigo-500 font-medium title-font mb-2 text-gray-900">
              Locate Us
            </h1>
            <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa eos
              blanditiis facere repellat illo adipisci.
            </p>
          </div>

          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d178462.87078597973!2d84.26580481212201!3d27.658001386859794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3994fb37e078d531%3A0x973f22922ea702f7!2sBharatpur%2044200!5e1!3m2!1sen!2snp!4v1648313039811!5m2!1sen!2snp"
              className="w-full"
              height={450}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
