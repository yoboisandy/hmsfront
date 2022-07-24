import axios from "../../../helpers/instance";
import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const EmployeeEdit = () => {
  //   const [employee, setEmployee] = useState([]);
  const [validationErr, setValidationErr] = useState({});
  const [employeeData, setEmployeeData] = useState({});
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [image, setImage] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  let { id } = useParams();

  const getEmployee = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/employees/${id}`).then((res) => {
      setEmployeeData(res.data);
      console.log(employeeData);
    });
    setLoading(false);
  };

  const getDepartments = async () => {
    await axios.get("http://localhost:8000/api/departments").then((res) => {
      setDepartments(res.data);
    });
  };
  const getShifts = async () => {
    await axios.get("http://localhost:8000/api/shifts").then((res) => {
      setShifts(res.data);
    });
  };
  // const getRoles = async () => {
  //   await axios
  //     .get("http://localhost:8000/api/roles", {
  //       headers: {
  //         Authorization: "Bearer " + token,
  //       },
  //     })
  //     .then((res) => {
  //       setRoles(res.data);
  //     });
  // };

  const handleInputChange = (e) => {
    setEmployeeData({ ...employeeData, [e.target.name]: e.target.value });
    console.log(employeeData);
  };

  const handleImageChange = (file) => {
    setImage(file[0]);
  };

  const updateEmployee = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    let dd = document.querySelector("#role_id").value;
    const fd = new FormData();
    console.log(employeeData);
    fd.append("firstname", employeeData.firstname);
    fd.append("lastname", employeeData.lastname);
    fd.append("email", employeeData.email);
    fd.append("dob", employeeData.dob);
    fd.append("phone", employeeData.phone);
    fd.append("department_id", employeeData.department_id);
    fd.append("role_id", dd);
    fd.append("shift_id", employeeData.shift_id);
    fd.append("designation", employeeData.designation);
    fd.append("address", employeeData.address);
    fd.append("image", employeeData.image);
    fd.append("citizenship_number", employeeData.citizenship_number);
    fd.append("pan_number", employeeData.pan_number);
    fd.append("salary", employeeData.salary);
    fd.append("joining_date", employeeData.joining_date);
    if (image) {
      fd.append("image", image);
    }

    fd.append("_method", "PATCH");
    console.log(fd.get("firstname"));
    // return fd;
    await axios
      .post(`http://localhost:8000/api/employees/${id}`, fd)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/employees");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };

  const loadRolesFromDepartment = () => {
    axios
      .get(
        `http://localhost:8000/api/departments/${employeeData.department_id}`
      )
      .then((res) => {
        setRoles(res.data.roles);
      });
  };

  useEffect(() => {
    if (employeeData.department_id) {
      loadRolesFromDepartment();
    }
  }, [employeeData.department_id]);

  useEffect(() => {
    getEmployee();
    // getRoles();
    getDepartments();
    getShifts();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Edit Employee</div>
              <div className="card-tools">
                <Link to="/dashboard/employees" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              {loading ? (
                <div className="d-flex justify-content-center py-5">
                  <div className="spinner-border text-indigo" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={updateEmployee} method="post">
                  <div className="form-group">
                    <label htmlFor="designation">Designation</label>
                    <select
                      className={`form-control ${
                        validationErr.designation ? "is-invalid" : ""
                      }`}
                      value={employeeData.designation}
                      onChange={handleInputChange}
                      name="designation"
                      id="designation"
                    >
                      <option disabled value={""}>
                        Select Designation
                      </option>
                      <option
                        value="Mr"
                        selected={employeeData.designation === "Mr"}
                      >
                        Mr
                      </option>
                      <option
                        value="Mrs"
                        selected={employeeData.designation === "Mrs"}
                      >
                        Mrs
                      </option>
                      <option
                        value="Er"
                        selected={employeeData.designation === "Er"}
                      >
                        Er
                      </option>
                      <option
                        value="Dr"
                        selected={employeeData.designation === "Dr"}
                      >
                        Dr
                      </option>
                    </select>
                    {validationErr.designation ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.designation}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.firstname}
                      name="firstname"
                      type="text"
                      className={`form-control ${
                        validationErr.firstname ? "is-invalid" : ""
                      }`}
                      id="firstname"
                      placeholder="Enter First Name"
                    />
                    {validationErr.firstname ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.firstname}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.lastname}
                      name="lastname"
                      type="text"
                      className={`form-control ${
                        validationErr.lastname ? "is-invalid" : ""
                      }`}
                      id="lastname"
                      placeholder="Enter Name"
                    />
                    {validationErr.lastname ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.lastname}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.email}
                      name="email"
                      type="text"
                      className={`form-control ${
                        validationErr.email ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter Name"
                    />
                    {validationErr.email ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.email}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Address</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.address}
                      name="address"
                      type="text"
                      className={`form-control ${
                        validationErr.address ? "is-invalid" : ""
                      }`}
                      id="address"
                      placeholder="Enter Address"
                    />
                    {validationErr.address ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.address}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="dob">Date Of Birth</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.dob}
                      name="dob"
                      type="date"
                      className={`form-control ${
                        validationErr.address ? "is-invalid" : ""
                      }`}
                      id="dob"
                    />
                    {validationErr.dob ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.dob}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.phone}
                      name="phone"
                      type="text"
                      className={`form-control ${
                        validationErr.phone ? "is-invalid" : ""
                      }`}
                      id="phone"
                      placeholder="Enter Phone Number"
                    />
                    {validationErr.phone ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.phone}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="image">Photo</label>
                    <div className="mb-2">
                      <img
                        className="img-fluid"
                        width={200}
                        src={`http://localhost:8000/storage/${employeeData.image}`}
                        alt=""
                      />
                    </div>
                    <input
                      onChange={(e) => handleImageChange(e.target.files)}
                      name="image"
                      type="file"
                      className={`form-control p-0 ${
                        validationErr.image ? "is-invalid" : ""
                      }`}
                      id="image"
                    />
                    {validationErr.image ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.image}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="salary">Salary</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.salary}
                      name="salary"
                      type="text"
                      className={`form-control ${
                        validationErr.salary ? "is-invalid" : ""
                      }`}
                      id="salary"
                      placeholder="Enter Salary"
                    />
                    {validationErr.salary ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.salary}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="citizenship_number">
                      Citizenship Number
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.citizenship_number}
                      name="citizenship_number"
                      type="text"
                      className={`form-control ${
                        validationErr.citizenship_number ? "is-invalid" : ""
                      }`}
                      id="citizenship_number"
                      placeholder="Enter Citizenship Number"
                    />
                    {validationErr.citizenship_number ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.citizenship_number}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="pan_number">PAN Number</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.pan_number}
                      name="pan_number"
                      type="text"
                      className={`form-control ${
                        validationErr.pan_number ? "is-invalid" : ""
                      }`}
                      id="pan_number"
                      placeholder="Enter PAN Number"
                    />
                    {validationErr.pan_number ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.pan_number}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="joining_date">Joining Date</label>
                    <input
                      onChange={handleInputChange}
                      value={employeeData.joining_date}
                      name="joining_date"
                      type="date"
                      className={`form-control ${
                        validationErr.joining_date ? "is-invalid" : ""
                      }`}
                      id="joining_date"
                    />
                    {validationErr.joining_date ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.joining_date}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="department_id">Department</label>
                    <select
                      className={`form-control ${
                        validationErr.department_id ? "is-invalid" : ""
                      }`}
                      onChange={handleInputChange}
                      value={employeeData.department_id}
                      name="department_id"
                      id="department_id"
                    >
                      <option disabled selected>
                        Select Department
                      </option>
                      {departments.map((department) => {
                        return (
                          <option
                            selected={
                              employeeData.department_id == department.id
                            }
                            value={department.id}
                          >
                            {department.name}
                          </option>
                        );
                      })}
                    </select>
                    {validationErr.department_id ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.department_id}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="shift_id">Shift</label>
                    <select
                      className={`form-control ${
                        validationErr.shift_id ? "is-invalid" : ""
                      }`}
                      onChange={handleInputChange}
                      value={employeeData.shift_id}
                      name="shift_id"
                      id="shift_id"
                    >
                      <option disabled selected>
                        Select Shift
                      </option>
                      {shifts.map((shift) => {
                        return (
                          <option
                            selected={employeeData.shift_id == shift.id}
                            value={shift.id}
                          >
                            {shift.name}
                          </option>
                        );
                      })}
                    </select>
                    {validationErr.shift_id ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.shift_id}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="role_id">Role</label>
                    <select
                      className={`form-control ${
                        validationErr.role_id ? "is-invalid" : ""
                      }`}
                      // onChange={(e) =>
                      //   setEmployeeData({
                      //     ...employeeData,
                      //     role_id: e.target.value,
                      //   })
                      // }
                      // value={employeeData.role_id}
                      // name="role_id"
                      id="role_id"
                    >
                      <option disabled selected>
                        Select Role
                      </option>
                      {roles.map((role) => {
                        return (
                          <option
                            selected={employeeData.role_id == role.id}
                            value={role.id}
                          >
                            {role.name}
                          </option>
                        );
                      })}
                    </select>
                    {validationErr.role_id ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.role_id}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="form-group my-2">
                    <button
                      onClick={updateEmployee}
                      type="submit"
                      className="btn bg-indigo"
                    >
                      {btnLoading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm mr-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          <span>Updating...</span>
                        </>
                      ) : (
                        "Update"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeEdit;
