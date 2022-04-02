import React from "react";
import { Route, Routes } from "react-router-dom";
import RoleCreate from "./RoleCreate";
import RoleEdit from "./RoleEdit";
import RoleIndex from "./RoleIndex";
import RoleShow from "./RoleShow";

const RoleApp = () => {
  return (
    <Routes>
      <Route path="/" element={<RoleIndex />} />
      <Route path="/create" element={<RoleCreate />} />
      <Route exact path="/edit/:id" element={<RoleEdit />} />
      <Route exact path="/:id" element={<RoleShow />} />
    </Routes>
  );
};

export default RoleApp;
