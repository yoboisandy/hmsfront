import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const ShiftShow = () => {
  const [shiftData, setShiftData] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const token = localStorage.getItem("token");

  const fetchShift = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/shifts/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setShiftData(res.data);
      });
    setLoading(false);
    console.log(shiftData);
  };

  useEffect(() => {
    fetchShift();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Shift Detail</div>

          <div className="card-tools">
            <Link
              to={`/dashboard/shifts/edit/${id}`}
              className="btn-sm bg-teal mr-1"
            >
              <i className=" fas fa-edit mr-1"></i>Edit
            </Link>
            <Link to="/dashboard/shifts" className="btn-sm bg-indigo">
              <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i> Go
              back
            </Link>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-bordered">
            <tbody>
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
                    <th>SN</th>
                    <td>{shiftData.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{shiftData.name}</td>
                  </tr>
                </>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ShiftShow;
