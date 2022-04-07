import { useContext, useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./Home";
import CustomerApp from "./customers/CustomerApp";
import DepartmentApp from "./departments/DepartmentApp";
import EmployeeApp from "./employees/EmployeeApp";
import FloorApp from "./floors/FloorApp";
import HallApp from "./halls/HallApp";
import RoleApp from "./roles/RoleApp";
import RoomApp from "./rooms/RoomApp";
import ShiftApp from "./shifts/ShiftApp";
import RoomTypeApp from "./roomtypes/RoomTypeApp";
import UserContext from "../../contexts/UserContext";
import FullSpinner from "../frontend/components/FullSpinner";
import BookingApp from "./bookings/BookingApp";
import FoodApp from "./Food/FoodApp";
// import "./css/adminlte.min.css";

const Admin = () => {
  //adminlte
  const adminltecss = document.createElement("link");
  adminltecss.rel = "stylesheet";
  adminltecss.href = "/adminlte/css/adminlte.min.css";
  adminltecss.id = "adminltecss";
  document.head.appendChild(adminltecss);
  // jquery.min.js
  const jqueryminjs = document.createElement("script");
  jqueryminjs.async = true;
  jqueryminjs.src = "/adminlte/js/jquery.min.js";
  document.body.appendChild(jqueryminjs);

  // bootstrap.bundle.min.js
  const bootstrapbundleminjs = document.createElement("script");
  bootstrapbundleminjs.async = true;
  bootstrapbundleminjs.src = "/adminlte/js/bootstrap.bundle.min.js";
  document.body.appendChild(bootstrapbundleminjs);
  // adminlte.min.js
  const adminlteminjs = document.createElement("script");
  adminlteminjs.async = true;
  adminlteminjs.src = "/adminlte/js/adminlte.min.js";
  document.body.appendChild(adminlteminjs);
  // adminlte body class
  document.body.classList.add(
    "hold-transition",
    "sidebar-mini",
    "layout-fixed",
    "layout-navbar-fixed"
  );

  const [user, fetchUser] = useContext(UserContext);
  const navigate = useNavigate();
  const [fullLoading, setFullLoading] = useState(false);

  useEffect(() => {
    setFullLoading(true);

    if (user.role === "") {
      navigate("/");
    } else if (
      user.role &&
      user.role !== "Admin" &&
      user.role !== "Frontoffice" &&
      user.role !== "Kitchen"
    ) {
      navigate("/");
    }

    setFullLoading(true);
  }, [user]);

  return (
    <>
      {fullLoading && <FullSpinner />}
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Customers */}
          <Route path="/customers/*" element={<CustomerApp />} />

          {/* rooms */}
          <Route path="/rooms/*" element={<RoomApp />} />

          {/* employees */}
          <Route exact path="/employees/*" element={<EmployeeApp />} />

          {/* shifts */}
          <Route path="/shifts/*" element={<ShiftApp />} />

          {/* roles */}
          <Route path="/roles/*" element={<RoleApp />} />

          {/* department */}
          <Route path="/departments/*" element={<DepartmentApp />} />

          {/* floors */}
          <Route path="/floors/*" element={<FloorApp />} />

          {/* Halls */}
          <Route path="/halls/*" element={<HallApp />} />

          {/* Room Types */}
          <Route path="/roomtypes/*" element={<RoomTypeApp />} />

          {/* Bookings */}
          <Route path="/bookings/*" element={<BookingApp />} />

          {/* food */}
          <Route path="/foods/*" element={<FoodApp />} />
        </Routes>
      </Layout>
    </>
  );
};

export default Admin;
