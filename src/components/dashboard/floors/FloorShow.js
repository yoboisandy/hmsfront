import axios from "../../../helpers/instance";
import { React, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const FloorShow = () => {
  const [floor, setFloor] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const token = localStorage.getItem("token");

  const getFloors = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/floors/${id}`).then((res) => {
      setFloor(res.data);
      console.log(floor);
    });
    setLoading(false);
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
          {loading && (
            <div className="d-flex justify-content-center py-5">
              <div className="spinner-border text-indigo" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          )}
          {!loading && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default FloorShow;
