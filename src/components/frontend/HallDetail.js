import axiosInstance from "../../helpers/instance";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import IndividualHallDetail from "./components/IndiividualHallDetail";

// import Datepicker from "@themesberg/tailwind-datepicker/Datepicker";
// import DateRangePicker from "@themesberg/tailwind-datepicker/DateRangePicker";
const HallDetail = () => {
  let { id } = useParams();
  const [hallDetail, setHallDetail] = useState({
    amenities: [],
  });
  const token = localStorage.getItem("token");
  const [user, fetchUser] = useContext(UserContext);

  const fetchHallDetails = async () => {
    await axiosInstance
      .get(`http://localhost:8000/api/hall/${id}`)
      .then((res) => {
        setHallDetail(res.data);
      });
  };

  useEffect(() => {
    fetchHallDetails();
  }, []);

  return <IndividualHallDetail {...hallDetail} user={user} />;
};

export default HallDetail;
