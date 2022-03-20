import React from "react";

const IndividualDetail = ({ image, type_name, description, amenities }) => {
  return (
    <div>
      <div className="mx-16 my-16">
        <div className="md:flex justify-between gap-12 ">
          <div className="md:w-8/12">
            <div>
              <img src={`http://localhost:8000/storage/${image}`} alt="" />
            </div>
            <div className="my-10">
              <h2 className="my-3 font-bold text-2xl">{type_name}</h2>
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
            <div className="bg-indigo-500 p-3 font-bold text-white">
              Rs.2400 /per person/night
            </div>
            <div className="border-2 pb-4 border-indigo-400 px-3">
              <form>
                <div className="flex gap-2">
                  <div className="py-4 w-1/2 space-y-2">
                    <label htmlFor="checkin">Check In</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name=""
                      id="checkin"
                    />
                  </div>
                  <div className="py-4 w-1/2 space-y-2">
                    <label htmlFor="checkout">Check Out</label>
                    <input
                      type="datetime-local"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name=""
                      id="checkout"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="py-4 w-1/2 space-y-2">
                    <label htmlFor="childs">Childs</label>
                    <input
                      type="number"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name=""
                      placeholder="no. of childs"
                      id="childs"
                    />
                  </div>
                  <div className="py-4 w-1/2 space-y-2">
                    <label htmlFor="adults">Adults</label>
                    <input
                      type="number"
                      className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      name=""
                      placeholder="no. of adults"
                      id="adults"
                    />
                  </div>
                </div>
                <div className="my-4">
                  <h2 className="font-bold">Extra Services</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center mt-3">
                      <div>
                        <div className="flex items-center">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="remember"
                              className="font-medium text-gray-900 dark:text-gray-300"
                            >
                              Breakfast
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">Rs.400</div>
                    </div>
                    <div className="flex justify-between items-center ">
                      <div>
                        <div className="flex items-center">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="remember"
                              className="font-medium text-gray-900 dark:text-gray-300"
                            >
                              Dinner
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">Rs.400</div>
                    </div>
                    <div className="flex justify-between items-center ">
                      <div>
                        <div className="flex items-center">
                          <div className="flex items-center h-5">
                            <input
                              id="remember"
                              aria-describedby="remember"
                              type="checkbox"
                              className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                              required
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label
                              htmlFor="remember"
                              className="font-medium text-gray-900 dark:text-gray-300"
                            >
                              Lunch
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="text-sm">Rs.400</div>
                    </div>
                  </div>
                </div>
                <center>
                  <button className="p-2 rounded-md mt-4 text-center w-3/4 text-white  bg-indigo-500 hover:bg-indigo-700 font-semibold">
                    Check availability
                  </button>
                </center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualDetail;
