import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import IndividualHallDetail from "./components/IndiividualHallDetail";

// import Datepicker from "@themesberg/tailwind-datepicker/Datepicker";
// import DateRangePicker from "@themesberg/tailwind-datepicker/DateRangePicker";
const HallDetail = () => {
  let { id } = useParams();
  const [hallDetail, setHallDetail] = useState({
    amenities: [],
  });
  const token = localStorage.getItem("token");

  const fetchHallDetails = async () => {
    await axios
      .get(`http://localhost:8000/api/hall/${id}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setHallDetail(res.data);
      });
  };

  useEffect(() => {
    fetchHallDetails();
  }, []);

  return <IndividualHallDetail {...hallDetail} />;
};

export default HallDetail;
