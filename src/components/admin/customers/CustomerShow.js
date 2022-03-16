import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import canView from "../permissions";

const CustomerShow = () => {
  const [customerData, setCustomerData] = useState({});
  const [loading, setLoading] = useState(false);
  let { id } = useParams();

  const fetchCustomer = async () => {
    setLoading(true);
    await axios.get(`http://localhost:8000/api/customers/${id}`).then((res) => {
      setCustomerData(res.data);
    });
    setLoading(false);
    console.log(customerData);
  };

  useEffect(() => {
    fetchCustomer();
  }, []);

  // useEffect(() => {
  //     if(user.role && !canView(user, "customers")) {

  //     }
  // }, [user]);
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Customer Detail</div>

          <div className="card-tools">
            <Link
              to={`/admin/customers/edit/${id}`}
              className="btn-sm bg-teal mr-1"
            >
              <i className=" fas fa-edit mr-1"></i>Edit
            </Link>
            <Link to="/admin/customers" className="btn-sm bg-indigo">
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
                    <th>ID</th>
                    <td>{customerData.id}</td>
                  </tr>
                  <tr>
                    <th>Name</th>
                    <td>
                      {customerData.firstname + " " + customerData.lastname}
                    </td>
                  </tr>
                  <tr>
                    <th>Email</th>
                    <td>{customerData.email}</td>
                  </tr>
                  <tr>
                    <th>Phone</th>
                    <td>{customerData.phone}</td>
                  </tr>
                  <tr>
                    <th>Address</th>
                    <td>{customerData.address}</td>
                  </tr>
                  <tr>
                    <th>Citizenship Number</th>
                    <td>{customerData.citizenship_number}</td>
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

export default CustomerShow;
