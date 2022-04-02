import React from "react";
import { Route, Routes } from "react-router-dom";
import BookingIndex from "./BookingIndex";

const BookingApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BookingIndex />} />
      </Routes>
    </div>
  );
};

export default BookingApp;
