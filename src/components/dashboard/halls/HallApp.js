import React from "react";
import { Route, Routes } from "react-router-dom";
import HallIndex from "./HallIndex";
import HallCreate from "./HallCreate";
import HallEdit from "./HallEdit";
import HallShow from "./HallShow";

const HallApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HallIndex />} />
      <Route path="/create" element={<HallCreate />} />
      <Route exact path="/edit/:id" element={<HallEdit />} />
      <Route exact path="/:id" element={<HallShow />} />
    </Routes>
  );
};

export default HallApp;
