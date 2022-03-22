import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const DepartmentShow = () => {
  const [departmentData, setDepartmentData] = useState({
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  let { id } = useParams();
  const token = localStorage.getItem("token");

  const fetchDepartment = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/departments/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setDepartmentData(res.data);
        console.log(departmentData);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchDepartment();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Department Detail</div>

          <div className="card-tools">
            <Link
              to={`/admin/departments/edit/${id}`}
              className="btn-sm bg-teal mr-1"
            >
              <i className=" fas fa-edit mr-1"></i>Edit
            </Link>
            <Link to="/admin/departments" className="btn-sm bg-indigo">
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
                    <td>{departmentData.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{departmentData.name}</td>
                  </tr>
                  <tr>
                    <th>Roles</th>
                    <tr>
                      {departmentData.roles.map((role) => {
                        return <td>{role.name}</td>;
                      })}
                    </tr>
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

export default DepartmentShow;
