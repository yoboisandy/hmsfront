import React from "react";
import { Route, Routes } from "react-router-dom";
import EmployeeCreate from "./EmployeeCreate";
import EmployeeEdit from "./EmployeeEdit";
import EmployeeIndex from "./EmployeeIndex";
import EmployeeShow from "./EmployeeShow";

const EmployeeApp = () => {
  return (
    <Routes>
      <Route exact path="/create" element={<EmployeeCreate />} />
      <Route exact path="/" element={<EmployeeIndex />} />
      <Route exact path="/edit/:id" element={<EmployeeEdit />} />
      <Route exact path="/:id" element={<EmployeeShow />} />
    </Routes>
  );
};

export default EmployeeApp;
