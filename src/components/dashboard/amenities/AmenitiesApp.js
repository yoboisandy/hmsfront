import React from "react";
import { Route, Routes } from "react-router-dom";
import AmenitiesCreate from "./AmenitiesCreate";
import AmenitiesEdit from "./AmenitiesEdit";
import AmenitiesIndex from "./AmenitiesIndex";

const AmenitiesApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<AmenitiesIndex />} />
        <Route path="/create" element={<AmenitiesCreate />} />
        <Route path="/edit/:id" element={<AmenitiesEdit />} />
      </Routes>
    </div>
  );
};

export default AmenitiesApp;
