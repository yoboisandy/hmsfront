import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import IndividualRoomDetail from "./components/IndividualRoomDetail";
import Spinner from "./components/Spinner";
// import Datepicker from "@themesberg/tailwind-datepicker/Datepicker";
// import DateRangePicker from "@themesberg/tailwind-datepicker/DateRangePicker";
const RoomDetail = () => {
  let { id } = useParams();
  const [roomDetail, setRoomDetail] = useState({
    amenities: [],
  });
  const [loading, setloading] = useState(false);
  const [user, fetchUser] = useContext(UserContext);
  const token = localStorage.getItem("token");

  const fetchRoomDetails = async () => {
    setloading(true);
    await axios
      .get(`http://localhost:8000/api/type/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setRoomDetail(res.data);
      });
    setloading(false);
  };

  useEffect(() => {
    fetchRoomDetails();
  }, []);

  return (
    <>
      {loading && <Spinner />}
      {!loading && <IndividualRoomDetail {...roomDetail} user={user} />}
    </>
  );
};

export default RoomDetail;
