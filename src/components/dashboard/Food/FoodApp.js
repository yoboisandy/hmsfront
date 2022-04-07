import React from "react";
import { Route, Routes } from "react-router-dom";
import FoodCreate from "./FoodCreate";
import FoodEdit from "./FoodEdit";
import FoodIndex from "./FoodIndex";

const FoodApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FoodIndex />} />
        <Route path="/create" element={<FoodCreate />} />
        <Route path="/edit/:id" element={<FoodEdit />} />
      </Routes>
    </div>
  );
};

export default FoodApp;
