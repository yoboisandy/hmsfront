import axios from "../../../helpers/instance";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const FoodIndex = () => {
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState([]);
  const token = localStorage.getItem("token");

  const fetchFoods = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/foods`).then((res) => {
      setFoods(res.data);
    });
    setLoading(false);
  };

  const handleDelete = async (id) => {
    const isConfirmed = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((res) => {
      return res.isConfirmed;
    });

    if (isConfirmed) {
      await axios
        .delete(`http://localhost:8000/api/foods/${id}`)
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          fetchFoods();
        })
        .catch((err) => {
          if (err.response.status === 500) {
            Swal.fire({
              text: "Status " + err.response.status + ": Something went wrong!",
              icon: "error",
            });
          } else {
            Swal.fire({
              text: "Status " + err.response.status + ": Something went wrong!",
              icon: "error",
            });
          }
        });
    }
  };

  const changeAvailabilty = async (id, status) => {
    await axios
      .put(`http://localhost:8000/api/changeavailability/${id}`, {
        status: status,
      })
      .then((res) => {
        Swal.fire({
          icon: "success",
          text: "Availability status changed",
        });
      });
    fetchFoods();
  };

  useEffect(() => {
    fetchFoods();
    console.log(foods);
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Food Items</div>
              <div className="card-tools">
                <Link to="/dashboard/foods/create" className="btn-sm bg-indigo">
                  <i className="fas fa-plus-circle mr-1"></i> Add New
                </Link>
              </div>
            </div>
            <div className="card-body p-0" style={{ overflowX: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead className="bg-indigo">
                  <tr className="text-center">
                    <th>SN</th>
                    <th>Food Item</th>
                    <th>Image</th>
                    <th>Price</th>
                    <th>Availability</th>
                    <th>Actions</th>
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
                    foods.map((food, index) => {
                      return (
                        <tr>
                          <td>{index + 1}</td>
                          <td>{food.name}</td>
                          <td>
                            <img
                              src={`http://localhost:8000/storage/${food.image}`}
                              width="150"
                              alt=""
                            />
                          </td>
                          <td>Rs. {food.price}</td>
                          <td>
                            <select
                              onChange={(e) =>
                                changeAvailabilty(food.id, e.target.value)
                              }
                              className="rounded-full"
                              name="status"
                            >
                              <option selected disabled>
                                Select Availability
                              </option>
                              <option
                                value="Available"
                                selected={food.status === "Available"}
                              >
                                Available
                              </option>
                              <option
                                value="Not Available"
                                selected={food.status === "Not Available"}
                              >
                                Not Available
                              </option>
                            </select>
                          </td>
                          <td className="d-flex justify-content-center">
                            <Link
                              to={`/dashboard/foods/edit/${food.id}`}
                              className="btn-sm bg-teal mr-1"
                            >
                              <i className=" fas fa-edit"> </i>
                            </Link>
                            <span
                              onClick={() => handleDelete(food.id)}
                              className="btn-sm bg-danger mr-1"
                            >
                              <i className="fas fa-trash-alt"> </i>
                            </span>
                          </td>
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

export default FoodIndex;
