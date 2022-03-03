import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const RoleShow = () => {
  const [roleData, setRoleData] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const fetchRole = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/roles/${id}`).then((res) => {
      setRoleData(res.data);
    });
    setLoading(false);
    console.log(roleData);
  };

  useEffect(() => {
    fetchRole();
  }, []);
  

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Role Detail</div>

          <div className="card-tools">
            <Link
              to={`/admin/roles/edit/${id}`}
              className="btn-sm bg-teal mr-1"
            >
              <i className=" fas fa-edit mr-1"></i>Edit
            </Link>
            <Link to="/admin/roles" className="btn-sm bg-indigo">
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
                    <td>
                      {roleData.id}
                    </td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>{roleData.name}</td>
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

export default RoleShow;
