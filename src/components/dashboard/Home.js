import axiosInstance from "../../helpers/instance";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  YAxis,
  Legend,
  Tooltip,
  BarChart,
  Bar,
} from "recharts";
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
  const [allTimeRoomReport, setAllTimeRoomReport] = useState([]);
  const [allTimeHallReport, setAllTimeHallReport] = useState([]);
  const [thisWeekRoomReport, setThisWeekRoomReport] = useState([]);
  const [thisWeekHallReport, setThisWeekHallReport] = useState([]);
  const token = localStorage.getItem("token");

  const allTimeReport = async () => {
    setloading(true);
    await axiosInstance
      .get(`http://localhost:8000/api/alltimeroomreport`)
      .then((res) => {
        setAllTimeRoomReport(res.data);
      });
    await axiosInstance
      .get(`http://localhost:8000/api/alltimehallreport`)
      .then((res) => {
        setAllTimeHallReport(res.data);
      });
    setloading(false);
  };
  const weekReport = async () => {
    setloading(true);
    await axiosInstance
      .get(`http://localhost:8000/api/thisweekroomreport`)
      .then((res) => {
        setThisWeekRoomReport(res.data);
      });
    await axiosInstance
      .get(`http://localhost:8000/api/thisweekhallreport`)
      .then((res) => {
        setThisWeekHallReport(res.data);
      });
    setloading(false);
  };

  const count = async () => {
    setloading(true);
    await axiosInstance.get(`http://localhost:8000/api/count`).then((res) => {
      setCounts(res.data);
    });
    setloading(false);
  };

  useEffect(() => {
    count();
    allTimeReport();
    weekReport();
  }, []);

  return (
    <div>
      {loading && <AdminSpinner />}
      {!loading && (
        <>
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
                  <Link
                    to="/dashboard/departments"
                    className="small-box-footer"
                  >
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
          <div>
            <section className="connectedSortable ui-sortable">
              <div
                className="card"
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <div className="card-header ">
                  <h3 className="card-title">
                    <i className="fas fa-bar-chart mr-1" />
                    Last 7 days Report
                  </h3>
                </div>
                <div className="card-body d-flex">
                  <div
                    className="w-50"
                    id="revenue-chart"
                    // style={{ position: "relative", height: 300 }}
                  >
                    <h5 className="ml-5">Room Bookings</h5>
                    <ResponsiveContainer width="100%" aspect={3}>
                      <BarChart
                        width={500}
                        height={500}
                        data={thisWeekRoomReport}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" interval={"preserveStartEnd"} />
                        <YAxis />
                        <Tooltip dataKey="total_bookings" />
                        {/* <Legend /> */}
                        <Bar dataKey="total_bookings" fill="#8884d8" />
                        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className="w-50"
                    id="revenue-chart"
                    // style={{ position: "relative", height: 300 }}
                  >
                    <h5 className="ml-5">Hall Bookings</h5>
                    <ResponsiveContainer width="100%" aspect={3}>
                      <BarChart
                        width={500}
                        height={500}
                        data={thisWeekHallReport}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="day" interval={"preserveStartEnd"} />
                        <YAxis />
                        <Tooltip dataKey="total_bookings" />
                        {/* <Legend /> */}
                        <Bar dataKey="total_bookings" fill="#8884d8" />
                        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
            <section className="connectedSortable ui-sortable">
              <div
                className="card"
                style={{ position: "relative", left: 0, top: 0 }}
              >
                <div className="card-header ">
                  <h3 className="card-title">
                    <i className="fas fa-chart-line mr-1" />
                    All time report
                  </h3>
                </div>
                <div className="card-body d-flex">
                  <div
                    className="w-50"
                    id="revenue-chart"
                    // style={{ position: "relative", height: 300 }}
                  >
                    <h5 className="ml-5">Room Bookings</h5>
                    <ResponsiveContainer width="100%" aspect={3}>
                      <LineChart
                        width={500}
                        height={500}
                        data={allTimeRoomReport}
                      >
                        <CartesianGrid strokeDashArray="3 3" />
                        <XAxis
                          dataKey="roomtype"
                          interval={"preserveStartEnd"}
                        />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line dataKey="total_bookings" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div
                    className="w-50"
                    id="revenue-chart"
                    // style={{ position: "relative", height: 300 }}
                  >
                    <h5 className="ml-5">Hall Bookings</h5>
                    <ResponsiveContainer width="100%" aspect={3}>
                      <LineChart
                        width={500}
                        height={500}
                        data={allTimeHallReport}
                      >
                        <CartesianGrid strokeDashArray="3 3" />
                        <XAxis dataKey="hall" interval={"preserveStartEnd"} />
                        <YAxis />
                        <Tooltip />
                        {/* <Legend /> */}
                        <Line dataKey="total_bookings" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
