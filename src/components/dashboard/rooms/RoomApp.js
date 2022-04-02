import React from "react";
import { Route, Routes } from "react-router-dom";
import RoomCreate from "./RoomCreate";
import RoomEdit from "./RoomEdit";
import RoomIndex from "./RoomIndex";
import RoomShow from "./RoomShow";

const RoomApp = () => {
  return (
    <Routes>
      <Route path="/" element={<RoomIndex />} />
      <Route path="/create" element={<RoomCreate />} />
      <Route exact path="/edit/:id" element={<RoomEdit />} />
      <Route exact path="/:id" element={<RoomShow />} />
    </Routes>
  );
};

export default RoomApp;
