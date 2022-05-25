import React from "react";
import { Route, Routes } from "react-router-dom";
import HallBookingIndex from "./HallBookingIndex";

const HallBookingApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HallBookingIndex />} />
      </Routes>
    </div>
  );
};

export default HallBookingApp;
