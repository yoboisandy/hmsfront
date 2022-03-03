import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const EmployeeIndex = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEmployees = async () => {
    setLoading(true);
    await axios.get("http://localhost:8000/api/employees").then((res) => {
      setEmployees(res.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title">All Employees</div>
          <div className="card-tools">
            <Link to="/admin/employees/create" className="btn-sm bg-indigo">
              <i className="fas fa-plus-circle mr-1"></i> Add New
            </Link>
          </div>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover table-bordered ">
            <thead>
              <tr>
                <th>SN</th>
                <th>ID</th>
                <th>Photo</th>
                <th>Name</th>
                <th>email</th>
                <th>Department</th>
                <th>Role</th>
                <th>Shift</th>
                <th>Actions</th>
              </tr>
            </thead>
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
                ""
              )}
              {employees.map((employee, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{employee.id}</td>
                    <td>
                      <img
                        src={`http://localhost:8000/storage/${employee.image}`}
                        width="40"
                        height="40"
                      />
                    </td>
                    {/* <td>{employee.image}</td> */}
                    <td>
                      {employee.designation +
                        " " +
                        employee.firstname +
                        " " +
                        employee.lastname}
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.department.name}</td>
                    <td>{employee.role.name}</td>
                    <td>{employee.shift.name}</td>
                    <td>
                      <Link
                        to={`/admin/customers/`}
                        className="btn-sm bg-success mr-1"
                      >
                        <i className="fa fa-eye"> </i>
                      </Link>
                      <Link
                        to={`/admin/customers/edit`}
                        className="btn-sm bg-teal mr-1"
                      >
                        <i className=" fas fa-edit"> </i>
                      </Link>
                      <span
                        // onClick={() => handleDelete(customer.id)}
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
  );
};

export default EmployeeIndex;
