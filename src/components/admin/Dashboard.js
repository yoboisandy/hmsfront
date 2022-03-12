import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
const Dashboard = () => {
  const [counts, setCounts] = useState({});
  const [loading, setloading] = useState(false);
  const count = async () => {
    setloading(true);
    await axios.get(`http://localhost:8000/api/count`).then((res) => {
      setCounts(res.data);
    });
    setloading(false);
  };

  useEffect(() => {
    count();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-6">
          <div className="small-box bg-info">
            <div className="inner">
              <h3>{counts.employee}</h3>
              <p>Total Employees</p>
            </div>
            <div className="icon">
              <i className="fas fa-user-hard-hat"></i>
            </div>
            <Link to="/admin/employees" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
        <div className="col-lg-3 col-6">
          <div className="small-box bg-success">
            <div className="inner">
              <h3>{counts.department}</h3>
              <p>Total Departments</p>
            </div>
            <div className="icon">
              <i className="ion ion-stats-bars" />
            </div>
            <Link to="/admin/departments" className="small-box-footer">
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
            <Link to="/admin/customers" className="small-box-footer">
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
            <Link to="/admin/rooms" className="small-box-footer">
              More info <i className="fas fa-arrow-circle-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
