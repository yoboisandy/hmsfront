import { React } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./layout/Layout";
import "../../index.css";
import { useEffect } from "react";
import Rooms from "./Rooms";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Contact from "./Contact";
import RoomDetail from "./RoomDetail";
import ScrollToTop from "react-scroll-to-top";
const Frontend = () => {
  useEffect(() => {}, []);

  return (
    <div>
      <Layout>
        <ScrollToTop
          smooth={true}
          color="#6610F2"
          style={{ width: "28px", margin: "auto" }}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rooms" element={<Rooms />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default Frontend;
