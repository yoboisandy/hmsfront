import React from "react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../helpers/instance";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";

const DepartmentEdit = () => {
  const [departmentData, setDepartmentData] = useState({
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setDepartmentData({ ...departmentData, [e.target.name]: e.target.value });
  };

  const getRoles = async () => {
    await axiosInstance.get("http://localhost:8000/api/roles").then((res) => {
      setRoles(res.data);
    });
  };
  const rolesOptions = [];
  roles.map((role) => {
    rolesOptions.push({ label: role.name, value: role.id });
  });

  let selectedRolesOption = [];
  selectedRoles.map((role) => {
    selectedRolesOption.push({ label: role.name, value: role.id });
  });

  const handleRoleChange = (e) => {
    // console.log(e);
    setSelectedRoles(e);
  };

  let { id } = useParams();

  const updateDepartment = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    console.log(selectedRoles);
    let values = selectedRoles.map((val) => {
      if (val.value) {
        return val.value;
      } else {
        return val.id;
      }
    });
    console.log(values);
    await axiosInstance
      .put(`http://localhost:8000/api/departments/${id}`, {
        ...departmentData,
        roles: values,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/dashboard/departments");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };

  const fetchDepartment = async () => {
    setLoading(true);
    await axiosInstance
      .get(`http://localhost:8000/api/departments/${id}`)
      .then((res) => {
        setDepartmentData({
          name: res.data.name,
        });
        setSelectedRoles(res.data.roles);
      });
    setLoading(false);
    console.log(selectedRoles);
  };

  useEffect(() => {
    fetchDepartment();
    getRoles();
    console.log(selectedRolesOption);
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Update Department</div>
              <div className="card-tools">
                <Link to="/dashboard/departments" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
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
                <form onSubmit={updateDepartment} method="post">
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      onChange={handleInputChange}
                      value={departmentData.name}
                      name="name"
                      type="text"
                      className={`form-control ${
                        validationErr.name ? "is-invalid" : ""
                      }`}
                      id="name"
                      placeholder="Enter Department Name"
                    />
                    {validationErr.name ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.name}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="roles">Roles</label>
                    <Select
                      isMulti
                      onChange={handleRoleChange}
                      defaultValue={selectedRolesOption}
                      options={rolesOptions}
                      name="roles"
                      className={` ${validationErr.roles ? "is-invalid" : ""}`}
                      id="roles"
                    />
                    {validationErr.roles ? (
                      <>
                        <span className="text-danger form-text">
                          {validationErr.roles}
                        </span>
                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div className="form-group my-2">
                    <button
                      onClick={updateDepartment}
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

export default DepartmentEdit;
