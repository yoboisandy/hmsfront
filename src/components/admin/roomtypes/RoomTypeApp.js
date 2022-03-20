import React from "react";
import { Routes, Route } from "react-router-dom";
import RoomTypeCreate from "./RoomTypeCreate";
import RoomTypeIndex from "./RoomTypeIndex";

const RoomTypeApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RoomTypeIndex />} />
        <Route path="/create" element={<RoomTypeCreate />} />
      </Routes>
    </div>
  );
};

export default RoomTypeApp;
