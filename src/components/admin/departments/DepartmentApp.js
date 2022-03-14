import React from "react";
import { Route, Routes } from "react-router-dom";
import DepartmentCreate from "./DepartmentCreate";
import DepartmentEdit from "./DepartmentEdit";
import DepartmentIndex from "./DepartmentIndex";
import DepartmentShow from "./DepartmentShow";

const DepartmentApp = () => {
  return (
    <Routes>
      <Route path="/" element={<DepartmentIndex />} />
      <Route path="/create" element={<DepartmentCreate />} />
      <Route exact path="/edit/:id" element={<DepartmentEdit />} />
      <Route exact path="/:id" element={<DepartmentShow />} />
    </Routes>
  );
};

export default DepartmentApp;
