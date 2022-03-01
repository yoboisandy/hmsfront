import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useNavigate, useParams } from "react-router-dom";

const CustomerEdit = () => {
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [validationErr, setValidationErr] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
    console.log(customerData);
  };

  let { id } = useParams();

  const updateCustomer = async (e) => {
    e.preventDefault();
    setBtnLoading(true);
    await axios
      .put(`http://localhost:8000/api/customers/${id}`, customerData)
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: res.data.message,
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/admin/customers");
      })
      .catch((err) => {
        setValidationErr(err.response.data.errors);
      });
    setBtnLoading(false);
  };

  const fetchCustomer = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/customers/${id}`).then((res) => {
      setCustomerData({
        firstname: res.data.firstname,
        lastname: res.data.lastname,
        email: res.data.email,
        phone: res.data.phone,
        address: res.data.address,
        citizenship_number: res.data.citizenship_number,
      });
    });
    setLoading(false);
    console.log(customerData);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);
  return (
    <div>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <div className="card-title text-lg">Add Customer</div>
              <div className="card-tools">
                <Link to="/admin/customers" className="btn-sm bg-indigo">
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
                <form onSubmit={updateCustomer} method="post">
                  <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.firstname}
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
                      value={customerData.lastname}
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
                      value={customerData.email}
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
                      value={customerData.address}
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
                    <label htmlFor="phone">Phone</label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.phone}
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
                    <label htmlFor="citizenship_number">
                      Citizenship Number
                    </label>
                    <input
                      onChange={handleInputChange}
                      value={customerData.citizenship_number}
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
                  {/* <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    onChange={handleInputChange}
                    value={customerData.password}
                    name="password"
                    type="password"
                    className={`form-control ${
                      validationErr.password ? "is-invalid" : ""
                    }`}
                    id="password"
                    placeholder="Enter Password"
                  />
                  {validationErr.password ? (
                    <>
                      <span className="text-danger form-text">
                        {validationErr.password}
                      </span>
                    </>
                  ) : (
                    ""
                  )}
                </div> */}
                  <div className="form-group my-2">
                    <button
                      onClick={updateCustomer}
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

export default CustomerEdit;
