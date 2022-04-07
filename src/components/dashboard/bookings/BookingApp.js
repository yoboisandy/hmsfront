import React from "react";
import { Route, Routes } from "react-router-dom";
import BookingCreate from "./BookingCreate";
import BookingEdit from "./BookingEdit";
import BookingIndex from "./BookingIndex";

const BookingApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<BookingIndex />} />
        <Route path="/create" element={<BookingCreate />} />
        <Route path="/edit/:id" element={<BookingEdit />} />
      </Routes>
    </div>
  );
};

export default BookingApp;
