import React from "react";
import { Route, Routes } from "react-router-dom";
import FloorCreate from "./FloorCreate";
import FloorEdit from "./FloorEdit";
import FloorIndex from "./FloorIndex";
import FloorShow from "./FloorShow";

const FloorApp = () => {
  return (
    <Routes>
      <Route path="/" element={<FloorIndex />} />
      <Route path="/create" element={<FloorCreate />} />
      <Route path="/:id" element={<FloorShow />} />
      <Route path="/edit/:id" element={<FloorEdit />} />
    </Routes>
  );
};

export default FloorApp;
