import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./layout/Layout";
import "../../index.css";
import { useEffect } from "react";
import Rooms from "./Rooms";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Frontend = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default Frontend;
