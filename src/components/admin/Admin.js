import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Dashboard from "./Dashboard";
import CustomerIndex from "./customers/CustomerIndex";
import CustomerCreate from "./customers/CustomerCreate";
import CustomerEdit from "./customers/CustomerEdit";
import CustomerShow from "./customers/CustomerShow";
import RoomIndex from "./rooms/RoomIndex";
import RoomCreate from "./rooms/RoomCreate";
import RoomEdit from "./rooms/RoomEdit";
import RoomShow from "./rooms/RoomShow";
import EmployeeCreate from "./employees/EmployeeCreate";
import EmployeeIndex from "./employees/EmployeeIndex";

import ShiftIndex from "./shifts/ShiftIndex";
import ShiftCreate from "./shifts/ShiftCreate";
import ShiftEdit from "./shifts/ShiftEdit";
import ShiftShow from "./shifts/ShiftShow";
// import "./css/adminlte.min.css";
// import "./all.min.css";
// import "./js/adminlte.min.js";
// import "./bootstrap.bundle.min.js";
// import "jquery.min.js";

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
    // const allmincss = document.createElement("link");
    // allmincss.href = "/adminlte/css/all.min.css";
    // allmincss.rel = "stylesheet";
    // document.head.appendChild(allmincss);
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
      {fullLoading ? (
        <div>Loading...</div>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerIndex />} />
            <Route path="/customers/create" element={<CustomerCreate />} />
            
            <Route
              exact
              path="/customers/edit/:id"
              element={<CustomerEdit />}
            />
          
            <Route exact path="/customers/:id" element={<CustomerShow />} />

            <Route path="/rooms" element={<RoomIndex />} />
            <Route path="/rooms/create" element={<RoomCreate />} />
            <Route exact path="/rooms/edit/:id" element={<RoomEdit />} />
            <Route exact path="/rooms/:id" element={<RoomShow />} />
            <Route
              exact
              path="/employees/create"
              element={<EmployeeCreate />}
            />
            <Route exact path="/employees" element={<EmployeeIndex />} />

            <Route path="/shifts" element={<ShiftIndex />} />
            <Route path="/shifts/create" element={<ShiftCreate />} />
            <Route exact path="/shifts/edit/:id" element={<ShiftEdit />} />
            <Route exact path="/shifts/:id" element={<ShiftShow />} />
          </Routes>
        </Layout>
      )}
    </>
  );
};

export default Admin;
