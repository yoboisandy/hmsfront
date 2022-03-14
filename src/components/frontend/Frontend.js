import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./layout/Layout";
import "../../index.css";
import { useEffect } from "react";

const Frontend = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default Frontend;
