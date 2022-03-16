import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./Dashboard";
import CustomerApp from "./customers/CustomerApp";
import DepartmentApp from "./departments/DepartmentApp";
import EmployeeApp from "./employees/EmployeeApp";
import FloorApp from "./floors/FloorApp";
import HallApp from "./halls/HallApp";
import RoleApp from "./roles/RoleApp";
import RoomApp from "./rooms/RoomApp";
import ShiftApp from "./shifts/ShiftApp";
// import "./css/adminlte.min.css";

const Admin = () => {
  //adminlte
  const adminltecss = document.createElement("link");
  adminltecss.rel = "stylesheet";
  adminltecss.href = "/adminlte/css/adminlte.min.css";
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

  const [fullLoading, setFullLoading] = useState(false);
  useEffect(() => {
    setFullLoading(true);

    setFullLoading(false);
  }, []);

  return (
    <>
      {fullLoading && <div>Loading...</div>}
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
        </Routes>
      </Layout>
    </>
  );
};

export default Admin;
