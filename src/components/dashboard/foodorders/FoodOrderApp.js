import React from "react";
import { Route, Routes } from "react-router-dom";
import FoodOrderIndex from "./FoodOrderIndex";

const FoodOrderApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FoodOrderIndex />} />
      </Routes>
    </div>
  );
};

export default FoodOrderApp;
