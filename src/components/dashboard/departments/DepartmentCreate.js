import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "../../../helpers/instance";
import Select from "react-select";

const DepartmentCreate = () => {
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();
  const [departmentData, setdepartmentData] = useState({
    name: "",
    roles: [],
  });
  const [loading, setLoading] = useState(false);
  const [roles, setRoles] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const token = localStorage.getItem("token");

  const handleInputChange = (e) => {
    setdepartmentData({ name: e.target.value });
    console.log(departmentData);
  };

  const getRoles = async () => {
    await axios.get("http://localhost:8000/api/roles").then((res) => {
      setRoles(res.data);
    });
  };
  const rolesOptions = [];
  roles.map((role) => {
    rolesOptions.push({ label: role.name, value: role.id });
  });

  // console.log(rolesOptions);

  const handleRoleChange = (e, act) => {
    console.log(e);
    setSelectedRoles(e);
  };

  useEffect(() => {
    getRoles();
  }, []);

  const saveDepartment = async (e) => {
    e.preventDefault();
    setLoading(true);

    let values = selectedRoles.map((val) => val.value);
    console.log(values);

    await axios
      .post(
        "http://localhost:8000/api/departments",

        {
          name: departmentData.name,
          roles: values,
        }
      )
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
    setLoading(false);
  };

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Add Department</div>
              <div className="card-tools">
                <Link to="/dashboard/departments" className="btn-sm bg-indigo">
                  <i className="fa fa-arrow-left mr-1" aria-hidden="true"></i>{" "}
                  Go back
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <form onSubmit={saveDepartment} method="post">
                <div className="form-group">
                  <label htmlFor="name">Department Name</label>
                  <input
                    onChange={handleInputChange}
                    value={departmentData?.name}
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
                    value={selectedRoles}
                    options={rolesOptions}
                    name="roles"
                    className={`${validationErr.roles ? "is-invalid" : ""}`}
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
                    onClick={saveDepartment}
                    type="submit"
                    className="btn bg-indigo"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm mr-2"
                          role="status"
                          aria-hidden="true"
                        ></span>
                        <span>Saving...</span>
                      </>
                    ) : (
                      "Create"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCreate;
