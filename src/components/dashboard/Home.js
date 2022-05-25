import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import FullLoadingContext from "../../contexts/FullLoadingContext";
import Spinner from "../frontend/components/Spinner";
import AdminSpinner from "./AdminSpinner";
import UserContext from "../../contexts/UserContext";
const Dashboard = () => {
  const [counts, setCounts] = useState({});
  const [loading, setloading] = useState(false);
  const [user] = useContext(UserContext);
  const [fullLoading, setFullLoading] = useContext(FullLoadingContext);
  const token = localStorage.getItem("token");
  const count = async () => {
    setloading(true);
    await axios
      .get(`http://localhost:8000/api/count`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCounts(res.data);
      });
    setloading(false);
  };

  useEffect(() => {
    count();
  }, []);

  return (
    <div>
      {loading && <AdminSpinner />}
      {!loading && (
        <div className="">
          {/* <div className="text-lg font-medium">Hello {user.role}</div> */}
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="small-box bg-info">
                <div className="inner">
                  <h3>{counts.roomtype}</h3>
                  <p>Total Room Types</p>
                </div>
                <div className="icon">
                  <i className="fas fa-user-hard-hat"></i>
                </div>
                <Link to="/dashboard/employees" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-success">
                <div className="inner">
                  <h3>{counts.hall}</h3>
                  <p>Total Halls</p>
                </div>
                <div className="icon">
                  <i className="ion ion-stats-bars" />
                </div>
                <Link to="/dashboard/departments" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-warning">
                <div className="inner">
                  <h3>{counts.customer}</h3>
                  <p>Total Customers</p>
                </div>
                <div className="icon">
                  <i className="ion ion-person-add" />
                </div>
                <Link to="/dashboard/customers" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="small-box bg-danger">
                <div className="inner">
                  <h3>{counts.room}</h3>
                  <p>Total Rooms</p>
                </div>
                <div className="icon">
                  <i className="ion ion-pie-graph" />
                </div>
                <Link to="/dashboard/rooms" className="small-box-footer">
                  More info <i className="fas fa-arrow-circle-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
