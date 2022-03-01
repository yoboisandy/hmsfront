import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

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
  return (
    <div>
      <div className="card">
        <div className="card-header">
          <div className="card-title text-lg">Customer Detail</div>

          <div className="card-tools">
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
                    <td>ID</td>
                    <td>{customerData.id}</td>
                  </tr>
                  <tr>
                    <td>Name</td>
                    <td>
                      {customerData.firstname + " " + customerData.lastname}
                    </td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{customerData.email}</td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{customerData.phone}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td>{customerData.address}</td>
                  </tr>
                  <tr>
                    <td>Citizenship Number</td>
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
