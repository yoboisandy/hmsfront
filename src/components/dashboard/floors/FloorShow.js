import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const FloorShow = () => {
  const [floor, setFloor] = useState({});
  let { id } = useParams();
  const token = localStorage.getItem("token");

  const getFloors = async () => {
    await axios
      .get(`http://localhost:8000/api/floors/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setFloor(res.data);
        console.log(floor);
      });
  };

  useEffect(() => {
    getFloors();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Floor Detail</div>
          <div className="card-tools">
            <Link
              to={`/dashboard/floors/edit/${id}`}
              className="btn-sm bg-teal mr-1"
            >
              <i className=" fas fa-edit mr-1"></i>Edit
            </Link>
            <Link to="/dashboard/floors" className="btn-sm bg-indigo">
              <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i> Go
              back
            </Link>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered">
            <tr>
              <th>ID</th>
              <td>{floor.id}</td>
            </tr>
            <tr>
              <th>Name</th>
              <td>{floor.name}</td>
            </tr>
            <tr>
              <th>Floor Number</th>
              <td>{floor.floor_number}</td>
            </tr>
            <tr>
              <th>Floor Description</th>
              <td>{floor.description}</td>
            </tr>
            <tr>
              <th>Created Date</th>
              <td>{floor.created_at}</td>
            </tr>
            <tr>
              <th>Updated Date</th>
              <td>{floor.updated_at}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FloorShow;
