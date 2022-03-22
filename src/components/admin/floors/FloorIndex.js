import axios from "axios";
import { useState, useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const FloorIndex = () => {
  const [floors, setFloors] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const getFloors = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/floors`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFloors(res.data);
        console.log(floors);
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
        .delete(`http://localhost:8000/api/floors/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          getFloors();
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

  useEffect(() => {
    getFloors();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">All Floors</div>
          <div className="card-tools">
            <Link to="/admin/floors/create" className="btn-sm bg-indigo">
              <i className="fas fa-plus-circle mr-1"></i> Add New
            </Link>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-bordered ">
            <thead className="bg-indigo">
              <tr>
                <th>SN</th>
                <th>ID</th>
                <th>Name</th>
                <th>Floor Number</th>
                <th>Created Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {floors.map((floor, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{floor.id}</td>
                    <td>{floor.name}</td>
                    <td>{floor.floor_number}</td>
                    <td>{floor.created_at}</td>
                    <td>
                      <td className="d-flex justify-content-center border-0">
                        <Link
                          to={`/admin/floors/${floor.id}`}
                          className="btn-sm bg-success mr-1"
                        >
                          <i className="fa fa-eye"> </i>
                        </Link>
                        <Link
                          to={`/admin/floors/edit/${floor.id}`}
                          className="btn-sm bg-teal mr-1"
                        >
                          <i className=" fas fa-edit"> </i>
                        </Link>
                        <span
                          onClick={() => handleDelete(floor.id)}
                          className="btn-sm bg-danger mr-1"
                        >
                          <i className="fas fa-trash-alt"> </i>
                        </span>
                      </td>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          .
        </div>
      </div>
    </div>
  );
};

export default FloorIndex;
