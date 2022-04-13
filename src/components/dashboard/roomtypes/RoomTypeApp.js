import React from "react";
import { Routes, Route } from "react-router-dom";
import RoomTypeCreate from "./RoomTypeCreate";
import RoomTypeEdit from "./RoomTypeEdit";
import RoomTypeIndex from "./RoomTypeIndex";
import RoomTypeShow from "./RoomTypeShow";

const RoomTypeApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<RoomTypeIndex />} />
        <Route path="/:id" element={<RoomTypeShow />} />
        <Route path="/create" element={<RoomTypeCreate />} />
        <Route path="/edit/:id" element={<RoomTypeEdit />} />
      </Routes>
    </div>
  );
};

export default RoomTypeApp;
