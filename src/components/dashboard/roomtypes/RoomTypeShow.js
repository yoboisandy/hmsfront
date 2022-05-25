import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const RoomTypeShow = () => {
  let { id } = useParams();
  const [roomType, setRoomType] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchRoOmType = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/roomtypes/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoomType(res.data);
        console.log(roomType);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchRoOmType();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Room Type Detail</div>
          <div className="card-tools">
            <div className="card-tools">
              <Link
                to={`/dashboard/roomtypes/edit/${id}`}
                className="btn-sm bg-teal mr-1"
              >
                <i className=" fas fa-edit mr-1"></i>Edit
              </Link>
              <Link to="/dashboard/roomtypes" className="btn-sm bg-indigo">
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
                        src={`http://localhost:8000/storage/${roomType.image}`}
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>ID</th>
                  <td>{roomType.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>{roomType.type_name}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{roomType.description}</td>
                </tr>
                <tr>
                  <th>Occupancy</th>
                  <td>{roomType.occupancy}</td>
                </tr>
                <tr>
                  <th>Price</th>
                  <td>{roomType.price}</td>
                </tr>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default RoomTypeShow;
