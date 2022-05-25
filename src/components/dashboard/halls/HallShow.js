import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const HallShow = () => {
  let { id } = useParams();
  const [hall, setHall] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchHall = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/halls/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setHall(res.data);
        console.log(hall);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchHall();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Hall Detail</div>
          <div className="card-tools">
            <div className="card-tools">
              <Link
                to={`/dashboard/halls/edit/${id}`}
                className="btn-sm bg-teal mr-1"
              >
                <i className=" fas fa-edit mr-1"></i>Edit
              </Link>
              <Link to="/dashboard/halls" className="btn-sm bg-indigo">
                <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i> Go
                back
              </Link>
            </div>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered">
            {loading ? (
              <tr>
                <td colSpan={9}>
                  <div className="d-flex justify-content-center py-5">
                    <div className="spinner-border text-indigo" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              <>
                <tr>
                  <td colSpan={2}>
                    <div className="d-flex justify-content-center w-full">
                      <img
                        className="img-fluid w-25 rounded-lg"
                        src={`http://localhost:8000/storage/${hall.image}`}
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>ID</th>
                  <td>{hall.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{hall.name}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{hall.description}</td>
                </tr>
                <tr>
                  <th>Occupancy</th>
                  <td>{hall.occupancy}</td>
                </tr>
                <tr>
                  <th>Floor</th>
                  <td>{hall.floor.name}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{hall.price}</td>
                </tr>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default HallShow;
