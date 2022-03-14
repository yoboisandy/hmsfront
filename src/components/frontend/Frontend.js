import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./layout/Layout";
import { useEffect } from "react";

const Frontend = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default Frontend;
