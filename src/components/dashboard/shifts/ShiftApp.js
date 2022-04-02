import React from "react";
import { Route, Routes } from "react-router-dom";
import ShiftCreate from "./ShiftCreate";
import ShiftEdit from "./ShiftEdit";
import ShiftIndex from "./ShiftIndex";
import ShiftShow from "./ShiftShow";

const ShiftApp = () => {
  return (
    <Routes>
      <Route path="/" element={<ShiftIndex />} />
      <Route path="/create" element={<ShiftCreate />} />
      <Route exact path="/edit/:id" element={<ShiftEdit />} />
      <Route exact path="/:id" element={<ShiftShow />} />
    </Routes>
  );
};

export default ShiftApp;
