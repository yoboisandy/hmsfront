import React from "react";
import { Routes, Route } from "react-router-dom";
import CustomerCreate from "./CustomerCreate";
import CustomerEdit from "./CustomerEdit";
import CustomerIndex from "./CustomerIndex";
import CustomerShow from "./CustomerShow";

const CustomerApp = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CustomerIndex />} />
        <Route path="/create" element={<CustomerCreate />} />
        <Route exact path="/edit/:id" element={<CustomerEdit />} />
        <Route exact path="/:id" element={<CustomerShow />} />
      </Routes>
    </div>
  );
};

export default CustomerApp;
