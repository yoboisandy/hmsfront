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
// import "../../../node_modules/admin-lte/plugins/bootstrap/js/bootstrap.bundle";
// import "../../../node_modules/admin-lte/dist/css/adminlte.min.css";
// import "../../../public/adminlte/css/adminlte.min.css";
// import "./all.min.css";
// import "./js/adminlte.min.js";
// import "./bootstrap.bundle.min.js";
// import "jquery.min.js";
// import "./adminlte/css/adminlte.min.css";

// import "./adminlte/js/jquery.min.js";
// import "./adminlte/js/bootstrap.bundle.min.js";
// import "./adminlte/js/adminlte.min.js";

const Admin = () => {
  const [fullLoading, setFullLoading] = useState(false);
  useEffect(() => {
    setFullLoading(true);
    //   adminlte.min.css
    const adminltemincss = document.createElement("link");
    adminltemincss.href = "/adminlte/css/adminlte.min.css";
    adminltemincss.rel = "stylesheet";
    document.head.appendChild(adminltemincss);
    // all.min.css
    const allmincss = document.createElement("link");
    allmincss.href = "/adminlte/css/all.min.css";
    allmincss.rel = "stylesheet";
    document.head.appendChild(allmincss);
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
