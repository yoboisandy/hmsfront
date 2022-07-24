import axiosInstance from "../../helpers/instance";
import React, { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Spinner from "./components/Spinner";
import CanOrderFood from "../../contexts/CanOrderFood";
import Swal from "sweetalert2";

const Food = () => {
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const token = localStorage.getItem("token");
  const canOrder = useContext(CanOrderFood);
  const navigate = useNavigate();

  const fetchFoods = async () => {
    setLoading(true);
    await axiosInstance
      .get(`http://localhost:8000/api/foodavailable`)
      .then((res) => {
        setFoods(res.data);
      });
    setLoading(false);
  };

  const handleOrder = async (id, food) => {
    let quantity = document.getElementById(`quantity${id}`).value;
    const isConfirmed = await Swal.fire({
      title: `Are you sure want to order ${quantity} ${food}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Order Now!",
    }).then((res) => {
      return res.isConfirmed;
    });
    if (isConfirmed) {
      await axiosInstance
        .post(`http://localhost:8000/api/order-food`, {
          food_id: id,
          quantity,
          quantity,
        })
        .then((res) => {
          if (res.data.messagetitle) {
            Swal.fire({
              title: res.data.messagetitle,
              text: res.data.messagetext,
            });
          }
          if (res.data.error) {
            Swal.fire({
              icon: "error",
              title: res.data.error,
              text: res.data.message,
            });
          }
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Something went wrong",
            text: err.data,
          });
        });
    }
  };

  useEffect(() => {
    if (!canOrder) {
      navigate("/");
    }
    fetchFoods();
  }, []);

  return (
    <div>
      <div className="">
        <div className="bg-indigo-900 h-72 bg-cover bg-center bg-[url('https://technext.github.io/royal/image/about_banner.jpg')] bg-blend-soft-light bg-fixed flex items-center justify-center">
          <div className="text-white ">
            {/* <div className="border-l-4 border-indigo-500 w-6/12 mx-auto"></div> */}
            <h2 className="text-6xl font-semibold tracking-wider border-l-8 border-indigo-500 pl-3 text-center flex items-center">
              <span>Foods</span>
            </h2>
          </div>
        </div>
      </div>
      <div className="my-8">
        <div>
          <h2 className="lg:text-4xl text-3xl font-semibold  pb-3 w-1/3 lg:w-1/4 text-center mx-auto border-b-2 border-indigo-300">
            Foods
          </h2>
        </div>
        <div>
          <section className="text-gray-600 body-font">
            <div className="px-5 py-12 mx-24">
              {loading && (
                <div className="flex justify-center">
                  <Spinner />
                </div>
              )}
              <div className="grid grid-cols-3 gap-6">
                {!loading &&
                  foods.map((el) => {
                    return (
                      <div className="border-2">
                        <div>
                          {/* {el.image} */}
                          <img
                            src={`http://localhost:8000/storage/${el.image}`}
                            className="h-60 w-full object-cover"
                          />
                        </div>
                        <div className="flex justify-around  py-4">
                          <div className="flex flex-col py-3 px-6 space-y-1 justify-center">
                            <span className="font-bold text-md tracking-wider">
                              {el.name}
                            </span>
                            <span className="font-semibold">
                              NRs. {el.price}
                            </span>
                          </div>
                          <div className="flex  py-3 px-6 items-center gap-3 justify-center">
                            <input
                              className="w-10 p-1 rounded-xl"
                              type="number"
                              id={`quantity${el.id}`}
                              min="1"
                              defaultValue="1"
                            />
                            <button
                              onClick={(e) => handleOrder(el.id, el.name)}
                              className="border-2 text-sm border-indigo-500 p-2 rounded-lg font-semibold hover:bg-indigo-500 hover:text-white"
                            >
                              Order
                            </button>
                          </div>
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
  );
};

export default Food;
