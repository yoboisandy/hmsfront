import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
const FoodOrderIndex = () => {
  const [foodOrders, setFoodOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [changeStatusMsg, setChangeStatusMsg] = useState("");
  const [foodOrderStatus, setFoodOrderStatus] = useState("");
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8000/api/orders", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFoodOrders(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    setLoading(false);
  };

  // const handleStatusChange = (e) => {
  //   setFoodOrderStatus({ ...foodOrderStatus, [e.target.name]: e.target.value });
  // };

  const updateStatus = async (id, status) => {
    await axios
      .put(
        `http://localhost:8000/api/changeorderstatus/${id}`,
        {
          status: status,
        },
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: res.data.message,
        });
      });
    fetchOrders();
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  //   const handleDelete = async (id) => {
  //     const isConfirmed = await Swal.fire({
  //       title: "Are you sure?",
  //       text: "You won't be able to revert this!",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       confirmButtonText: "Yes, delete it!",
  //     }).then((res) => {
  //       return res.isConfirmed;
  //     });

  //     if (isConfirmed) {
  //       await axios
  //         .delete(`http://localhost:8000/api/foodOrders/${id}`, {
  //           headers: {
  //             Authorization: "Bearer " + token,
  //           },
  //         })
  //         .then((res) => {
  //           Swal.fire({
  //             icon: "success",
  //             text: res.data.message,
  //           });
  //           fetchOrders();
  //         })
  //         .catch((err) => {
  //           if (err.response.status === 500) {
  //             Swal.fire({
  //               text: "Status " + err.response.status + ": Something went wrong!",
  //               icon: "error",
  //             });
  //           } else {
  //             Swal.fire({
  //               text: "Status " + err.response.status + ": Something went wrong!",
  //               icon: "error",
  //             });
  //           }
  //         });
  //     }
  //   };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Food Orders</div>
            </div>
            <div className="card-body p-0" style={{ overflowX: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead className="bg-indigo">
                  <tr className="text-center">
                    <th>SN</th>
                    <th>Food</th>
                    <th>Quantity</th>
                    <th>Customer</th>
                    <th>Room Number</th>
                    <th>Price</th>
                    <th>Status</th>
                    {/* <th>Actions</th> */}
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td colSpan={9}>
                        <div className="d-flex justify-content-center py-5">
                          <div
                            className="spinner-border text-indigo"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    foodOrders.map((order, index) => {
                      return (
                        <tr>
                          {/* <td>{index + 1}</td> */}
                          <td>{order.id}</td>
                          <td>{order.food.name}</td>
                          <td>{order.quantity}</td>
                          <td>{order.user.name}</td>
                          <td>{order.room.room_no}</td>
                          <td>Rs. {order.price}</td>
                          <td>
                            {/* {order.status === "Canceled" && (
                              <span>Canceled</span>
                            )}
                            {order.status === "Delivered" && (
                              <span>Delivered</span>
                            )} */}
                            {(order.status !== "Canceled" ||
                              order.status !== "Delivered") && (
                              <form>
                                <select
                                  className="form-control"
                                  disabled={
                                    order.status === "Delivered" ||
                                    order.status === "Canceled"
                                  }
                                  onChange={(e) => {
                                    updateStatus(order.id, e.target.value);
                                  }}
                                  name="status"
                                  id="status"
                                >
                                  {order.status === "Pending" && (
                                    <option
                                      value="Pending"
                                      selected={order.status === "Pending"}
                                    >
                                      Pending
                                    </option>
                                  )}
                                  {(order.status === "Pending" ||
                                    order.status === "Confirmed") && (
                                    <option
                                      value="Confirmed"
                                      selected={order.status === "Confirmed"}
                                    >
                                      Confirmed
                                    </option>
                                  )}
                                  {(order.status === "Confirmed" ||
                                    order.status === "Preparing") && (
                                    <option
                                      value="Preparing"
                                      selected={order.status === "Preparing"}
                                    >
                                      Preparing
                                    </option>
                                  )}
                                  {(order.status === "Preparing" ||
                                    order.status === "Ready") && (
                                    <option
                                      value="Ready"
                                      selected={order.status === "Ready"}
                                    >
                                      Ready To Deliver
                                    </option>
                                  )}
                                  {(order.status === "Ready" ||
                                    order.status === "Delivered") && (
                                    <option
                                      value="Delivered"
                                      selected={order.status === "Delivered"}
                                    >
                                      Delivered
                                    </option>
                                  )}
                                  {(order.status === "Pending" ||
                                    order.status === "Canceled" ||
                                    order.status === "Confirmed") && (
                                    <option
                                      value="Canceled"
                                      selected={order.status === "Canceled"}
                                    >
                                      Canceled
                                    </option>
                                  )}
                                </select>
                              </form>
                            )}
                          </td>

                          {/*<td className="d-flex justify-content-center">
                           <Link
                            to={`/dashboard/foodOrders/${order.id}`}
                            className="btn-sm bg-success mr-1"
                          >
                            <i className="fa fa-eye"> </i>
                          </Link>
                          <Link
                            to={`/dashboard/foodOrders/edit/${order.id}`}
                            className="btn-sm bg-teal mr-1"
                          >
                            <i className=" fas fa-edit"> </i>
                          </Link> 
                          <span
                            onClick={() => handleDelete(order.id)}
                            className="btn-sm bg-danger mr-1"
                          >
                            <i className="fas fa-trash-alt"> </i>
                          </span>
                        </td>*/}
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodOrderIndex;
