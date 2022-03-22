import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const EmployeeShow = () => {
  let { id } = useParams();
  const [employee, setEmployee] = useState({});
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const fetchEmployee = async () => {
    setLoading(true);
    await axios
      .get(`http://localhost:8000/api/employees/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setEmployee(res.data);
        console.log(employee);
      });
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployee();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Employee Detail</div>
          <div className="card-tools">
            <div className="card-tools">
              <Link
                to={`/admin/employees/edit/${id}`}
                className="btn-sm bg-teal mr-1"
              >
                <i className=" fas fa-edit mr-1"></i>Edit
              </Link>
              <Link to="/admin/employees" className="btn-sm bg-indigo">
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
                        src={`http://localhost:8000/storage/${employee.image}`}
                        alt=""
                      />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>ID</th>
                  <td>{employee.id}</td>
                </tr>
                <tr>
                  <th>Name</th>
                  <td>
                    {employee.designation +
                      " " +
                      employee.firstname +
                      " " +
                      employee.lastname}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{employee.email}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{employee.address}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{employee.phone}</td>
                </tr>
                <tr>
                  <th>Department</th>
                  <td>{employee.department.name}</td>
                </tr>
                <tr>
                  <th>Role</th>
                  <td>{employee.role.name}</td>
                </tr>
                <tr>
                  <th>Shift</th>
                  <td>{employee.shift.name}</td>
                </tr>
                <tr>
                  <th>Date of birth</th>
                  <td>{employee.dob}</td>
                </tr>
                <tr>
                  <th>Citizenship Number</th>
                  <td>{employee.citizenship_number}</td>
                </tr>
                <tr>
                  <th>PAN Number</th>
                  <td>{employee.pan_number}</td>
                </tr>
                <tr>
                  <th>Salary</th>
                  <td>Rs. {employee.salary}</td>
                </tr>
              </>
            )}
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeShow;
