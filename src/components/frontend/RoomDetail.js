import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IndividualDetail from "./components/IndividualDetail";
// import Datepicker from "@themesberg/tailwind-datepicker/Datepicker";
// import DateRangePicker from "@themesberg/tailwind-datepicker/DateRangePicker";
const RoomDetail = () => {
  let { id } = useParams();
  const [roomDetail, setRoomDetail] = useState({
    amenities: [],
  });
  const token = localStorage.getItem("token");

  const fetchRoomDetails = async () => {
    await axios
      .get(`http://localhost:8000/api/roomtypes/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoomDetail(res.data);
      });
  };

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  return <IndividualDetail {...roomDetail} />;
};

export default RoomDetail;
