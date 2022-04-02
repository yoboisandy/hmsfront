import { React, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Layout from "./layout/Layout";
import "../../index.css";
import { useEffect, useState } from "react";
import Rooms from "./Rooms";
import "flowbite";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Contact from "./Contact";
import RoomDetail from "./RoomDetail";
import ScrollToTop from "react-scroll-to-top";
import Logout from "./auth/Logout";
import FullLoadingContext from "../../contexts/FullLoadingContext";
import FullSpinner from "./components/FullSpinner";
import Halls from "./Halls";
import HallDetail from "./HallDetail";
import MyBookings from "./MyBookings";
import Profile from "./Profile";
const Frontend = () => {
  const [fullLoading, setFullLoading] = useContext(FullLoadingContext);
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
          <Route path="/rooms/:id" element={<RoomDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/halls" element={<Halls />} />
          <Route path="/halls/:id" element={<HallDetail />} />
          <Route path="/halls/:id" element={<HallDetail />} />
          <Route path="/mybookings" element={<MyBookings />} />
          {/* auth */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />

          {/* profile */}
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </div>
  );
};

export default Frontend;
