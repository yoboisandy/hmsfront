import React from "react";

const Spinner = () => {
  return (
    <div className="mx-auto my-12">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-40 h-40 border-4 border-indigo-500 border-dotted rounded-full animate-spin"
      />
    </div>
  );
};

export default Spinner;
