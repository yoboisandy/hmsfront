import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

import axios from "axios";
const AmenitiesIndex = () => {
  const [amenities, setAmenities] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchAmenities = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8000/api/amenities", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setAmenities(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.data.msg);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchAmenities();
  }, []);

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
        .delete(`http://localhost:8000/api/amenities/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Swal.fire({
            icon: "success",
            text: res.data.message,
          });
          fetchAmenities();
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

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Departments</div>
              <div className="card-tools">
                <Link
                  to="/dashboard/amenities/create"
                  className="btn-sm bg-indigo"
                >
                  <i className="fas fa-plus-circle mr-1"></i> Add New
                </Link>
              </div>
            </div>
            <div className="card-body p-0" style={{ overflowX: "auto" }}>
              <table className="table table-hover table-bordered">
                <thead className="bg-indigo">
                  <tr className="text-center">
                    <th>SN</th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
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
                  ) : (
                    ""
                  )}
                  {amenities.map((amenity, index) => {
                    return (
                      <tr>
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={`http://localhost:8000/storage/${amenity.icon}`}
                            style={{
                              width: "64px",
                              height: "64px",
                            }}
                          />
                        </td>
                        <td>{amenity.name}</td>
                        <td className="d-flex justify-content-center">
                          <Link
                            to={`/dashboard/amenities/edit/${amenity.id}`}
                            className="btn-sm bg-teal mr-1"
                          >
                            <i className=" fas fa-edit"> </i>
                          </Link>
                          <span
                            onClick={() => handleDelete(amenity.id)}
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

export default AmenitiesIndex;
